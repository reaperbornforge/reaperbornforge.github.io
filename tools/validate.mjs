import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function dependency(name,entry) {
  return process.env.RF_TOOLS_MODULES
    ? import(pathToFileURL(path.join(process.env.RF_TOOLS_MODULES,name,entry)).href)
    : name==='pdfjs-dist' ? import(name+'/'+entry) : import(name);
}
const {parseHTML}=await dependency('linkedom','esm/index.js');
const files=['index.html','404.html',...['legacy-of-allard','head-volley-clash','tiny-ruins-tycoon','escape-adventure'].map(s=>`projects/${s}/index.html`),'assets/resumes/en.html','assets/resumes/pt.html'];
const docs=new Map(files.map(f=>[f,parseHTML(fs.readFileSync(path.join(root,f),'utf8')).document]));
let links=0;
for(const [file,doc] of docs) {
  assert.equal(doc.querySelectorAll('main').length,1,`${file}: one main landmark`);
  assert(doc.querySelector('title')?.textContent,`${file}: title`);
  for(const el of doc.querySelectorAll('p,span,h1,h2,h3,li')) {
    for(const node of el.childNodes) if(node.nodeType===3) {
      assert(!/[\p{L}]\?[\p{L}]|\uFFFD/u.test(node.textContent),`${file}: damaged text encoding`);
    }
  }
  const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);
  assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
  for(const el of doc.querySelectorAll('[href],[src]')) {
    const value=el.getAttribute('href')||el.getAttribute('src');
    if(!value||/^(https?:|mailto:|data:)/.test(value)) continue;
    const url=new URL(value,'https://local.test/'+file);
    let target=decodeURIComponent(url.pathname).replace(/^\//,'');
    if(target===''||target.endsWith('/')) target+='index.html';
    assert(fs.existsSync(path.join(root,target)),`${file}: missing ${target}`);
    if(url.hash && docs.has(target)) assert(docs.get(target).getElementById(url.hash.slice(1)),`${file}: missing ${target}${url.hash}`);
    links++;
  }
  for(const script of doc.querySelectorAll('script:not([src])')) new vm.Script(script.textContent,{filename:file});
}
for(const f of ['assets/i18n.js','assets/gallery.js','assets/navigation.js']) new vm.Script(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
for(const lang of ['en','pt']) for(const query of ['recruiter','studio','','invalid']) for(const reduced of [true,false]) {
  const view=query==='studio'?'studio':'recruiter';
  const {document,window}=parseHTML(fs.readFileSync(path.join(root,'index.html'),'utf8'));
  const storage=new Map();
  window.location={search:`?view=${query}&lang=${lang}`,href:`https://local.test/?view=${query}&lang=${lang}`};
  let replacedUrl;
  window.history={replaceState:(_state,_title,url)=>{replacedUrl=url;}};
  window.localStorage={getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)};
  window.matchMedia=()=>({matches:reduced});
  for(const canvas of document.querySelectorAll('canvas')) canvas.getContext=()=>null;
  const sandbox={window,document,navigator:{language:'en'},localStorage:window.localStorage,URL,URLSearchParams,CustomEvent:window.CustomEvent,setTimeout,clearTimeout,requestAnimationFrame:()=>0,IntersectionObserver:class {observe(){} unobserve(){}}};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root,'assets/i18n.js'),'utf8'),sandbox);
  for(const script of document.querySelectorAll('script:not([src])')) vm.runInContext(script.textContent,sandbox);
  document.dispatchEvent(new window.Event('DOMContentLoaded'));
  assert.equal(document.documentElement.getAttribute('lang'),lang==='pt'?'pt-BR':'en');
  assert.equal(document.getElementById(`${view}-view`).style.display,'block');
  assert(document.getElementById(`btn-${view}`).classList.contains('active'));
  assert.equal(document.querySelector(`[data-set-lang="${lang}"]`).getAttribute('aria-pressed'),'true');
  window.RFLang.set(lang==='pt'?'en':'pt');
  assert.equal(document.documentElement.getAttribute('data-lang'),lang==='pt'?'en':'pt');
  assert.equal(replacedUrl.searchParams.get('lang'),lang==='pt'?'en':'pt');
  assert.equal(replacedUrl.searchParams.get('view'),query);
}
for(const slug of ['legacy-of-allard','tiny-ruins-tycoon','escape-adventure']) {
  const dir=path.join(root,'assets/projects',slug);
  for(const item of JSON.parse(fs.readFileSync(path.join(dir,'images.json'),'utf8'))) assert(fs.existsSync(path.join(dir,item.src||item)),`${slug}: gallery image`);
}
const pdf=await dependency('pdfjs-dist','legacy/build/pdf.mjs');
for(const file of ['cv/Otavio_Rosindo_CV_Game_Designer_EN.pdf','cv/Otavio_Rosindo_CV_Game_Designer_PT.pdf']) {
  const document=await pdf.getDocument({data:new Uint8Array(fs.readFileSync(path.join(root,'assets',file))),useSystemFonts:true}).promise;
  assert.equal(document.numPages,1,`${file}: one page`);
  const page=await document.getPage(1);
  const content=await page.getTextContent();
  const text=content.items.map(i=>i.str).join(' ');
  for(const project of ['Head Volley Clash','Legacy of Allard','Tiny Ruins Tycoon','Escape Adventure']) assert(text.includes(project),`${file}: ${project}`);
  for(const phrase of ['otaviorosindo@gmail.com']) assert(text.includes(phrase),`${file}: ${phrase}`);
  assert(!/35K|35 mil|40 MAU|setup-and-detonate|setup e detonação/.test(text),`${file}: stale claims`);
  for(const item of content.items) if(item.transform) assert(item.transform[5]>15 && item.transform[5]<825,`${file}: content inside page`);
  assert((await page.getAnnotations()).filter(a=>a.subtype==='Link').length>=2,`${file}: clickable links`);
}
console.log(`PASS: ${files.length} HTML pages, ${links} local references, gallery manifests, 16 view/language/motion combinations and 2 searchable one-page PDFs.`);
