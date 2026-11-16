import {chromium} from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createPreview} from './preview.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'artifacts');
fs.mkdirSync(path.join(output,'screenshots'),{recursive:true});
const server=createPreview(path.join(root,'dist'));
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const report={startedAt:new Date().toISOString(),browser:'Microsoft Edge (Chromium)',manifestSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(output,'publication-manifest.json'))).digest('hex'),checks:[],errors:[]};
let browser;
try {
  browser=await chromium.launch({executablePath:process.env.RF_BROWSER||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  for(const width of [1440,768,390,320]) {
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',error=>report.errors.push({width,error:error.message}));
    page.on('response',response=>{if(response.url().startsWith(origin)&&response.status()>=400) report.errors.push({width,url:response.url(),status:response.status()});});
    const routes=['/?view=recruiter','/?view=studio',...['head-volley-clash','legacy-of-allard','tiny-ruins-tycoon','escape-adventure'].map(s=>`/projects/${s}/`),'/assets/resumes/en.html','/assets/resumes/pt.html','/404.html'];
    for(const route of routes) for(const lang of route.includes('/resumes/')?['en']:['en','pt']) {
      const url=origin+route+(route.includes('?')?'&':'?')+'lang='+lang;
      const response=await page.goto(url,{waitUntil:'networkidle'});
      assert.equal(response.status(),200,url);
      await page.evaluate(()=>document.fonts.ready);
      // A full-page screenshot must include images beyond the initial viewport.
      await page.locator('img').evaluateAll(async images=>Promise.all(images.filter(i=>i.offsetParent!==null).map(i=>{i.loading='eager';return i.decode().catch(()=>{});}))); 
      assert.equal(await page.locator('main').count(),1,url);
      const overflow=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
      if(overflow.scroll>overflow.viewport+1) {
        report.overflow=await page.locator('body *').evaluateAll(nodes=>nodes.map(n=>({tag:n.tagName,class:n.className,left:n.getBoundingClientRect().left,right:n.getBoundingClientRect().right})).filter(n=>n.right>innerWidth+1||n.left< -1).slice(0,25));
        await page.screenshot({path:path.join(output,'screenshots','overflow.png'),fullPage:true});
      }
      assert(overflow.scroll<=overflow.viewport+1,`${url}: horizontal overflow at ${width}: ${JSON.stringify(overflow)}`);
      const broken=await page.locator('img').evaluateAll(images=>images.filter(i=>i.offsetParent!==null&&i.complete&&i.naturalWidth===0).map(i=>i.src));
      assert.deepEqual(broken,[],`${url}: broken images`);
      if(route.startsWith('/projects/')) {
        await page.waitForFunction(()=>{const images=[...document.querySelectorAll('.gallery img')];return images.length>0&&images.every(i=>i.complete&&i.naturalWidth>0);});
        const img=page.locator('.gallery img').first();
        const initial=await img.getAttribute('src');
        const next=page.locator('.gallery-next').first();
        if(await next.count()) {await next.click();assert.notEqual(await img.getAttribute('src'),initial);}
        if(route.includes('head-volley-clash')) {
          const expected=JSON.parse(fs.readFileSync(path.join(root,'assets/HeadVolleyClash/images.json'),'utf8'));
          assert.equal(await page.locator('.gallery-dot').count(),7);
          for(const [index,item] of expected.entries()) {
            await page.locator('.gallery-dot').nth(index).click();
            await img.evaluate(image=>image.decode());
            assert((await img.getAttribute('src')).endsWith(item.src));
            if(index<2&&lang==='pt'&&(width===390||width===1440)) {
              await page.locator('.gallery-stage').screenshot({path:path.join(output,'screenshots',`hvc-gallery-${index+1}-${width}.png`)});
            }
          }
        }
      }
      if((width===1440||width===390)&&route.startsWith('/?view=')&&lang==='pt') {
        await page.screenshot({path:path.join(output,'screenshots',`${route.includes('studio')?'studio':'recruiter'}-${width}.png`),fullPage:true});
      }
      report.checks.push({route,lang,width,status:'passed'});
    }
    // Language selection must survive refresh and keep the selected audience.
    await page.goto(origin+'/?view=studio&lang=pt');
    await page.locator('[data-set-lang="en"]').click();
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('lang'),'en');
    assert(await page.locator('#studio-view').isVisible());
    // Enter a case from Studio and return to the Studio projects section.
    await page.locator('#studio-view a.poster').first().click();
    assert(new URL(page.url()).searchParams.get('view')==='studio');
    await page.locator('.back-btn').click();
    assert(await page.locator('#studio-view').isVisible());
    assert.equal(new URL(page.url()).hash,'#projects');
    // The narrative modal opens, traps focus and restores its trigger on Escape.
    await page.locator('[data-modal="sharp-memories-modal"]').click();
    assert(await page.locator('#sharp-memories-modal').isVisible());
    await page.keyboard.press('Tab');
    assert(await page.evaluate(()=>!!document.activeElement.closest('#sharp-memories-modal')));
    await page.keyboard.press('Escape');
    assert(!(await page.locator('#sharp-memories-modal').isVisible()));
    assert.equal(await page.locator(':focus').getAttribute('data-modal'),'sharp-memories-modal');
    for(const name of ['Resume - Otavio Rosindo.pdf','Curriculo - Otavio Rosindo.pdf']) {
      const response=await context.request.get(origin+'/assets/'+encodeURIComponent(name));
      assert.equal(response.status(),200);assert(response.headers()['content-type'].startsWith('application/pdf'));
    }
    await context.close();
  }
  assert.deepEqual(report.errors,[],'Browser errors and local HTTP failures');
  report.result='passed';
  console.log(`PASS: ${report.checks.length} page/language/viewport checks, galleries, language refresh, Studio return navigation, modal keyboard flow and PDF downloads.`);
} catch(error) {report.result='failed';report.failure=error.stack;throw error;}
finally {
  report.finishedAt=new Date().toISOString();
  fs.writeFileSync(path.join(output,'browser-report.json'),JSON.stringify(report,null,2)+'\n');
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
