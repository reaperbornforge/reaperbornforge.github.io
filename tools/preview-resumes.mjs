import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {getDocument} from 'pdfjs-dist/legacy/build/pdf.mjs';
import {createCanvas} from '@napi-rs/canvas';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'artifacts/screenshots');
fs.mkdirSync(out,{recursive:true});
for(const [lang,file] of [['pt','cv/Otavio_Rosindo_CV_Game_Designer_PT.pdf'],['en','cv/Otavio_Rosindo_CV_Game_Designer_EN.pdf']]) {
  const document=await getDocument({data:new Uint8Array(fs.readFileSync(path.join(root,'assets',file))),useSystemFonts:true}).promise;
  const page=await document.getPage(1);
  const viewport=page.getViewport({scale:1.5});
  const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));
  await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
  fs.writeFileSync(path.join(out,`resume-${lang}.png`),canvas.toBuffer('image/png'));
}
console.log('Resume visual previews: artifacts/screenshots/resume-{pt,en}.png');
