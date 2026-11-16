import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lib = process.env.RF_TOOLS_MODULES
  ? await import(pathToFileURL(path.join(process.env.RF_TOOLS_MODULES, 'pdf-lib/es/index.js')).href).catch(() => import(pathToFileURL(path.join(process.env.RF_TOOLS_MODULES, 'pdf-lib/cjs/index.js')).href))
  : await import('pdf-lib');
const { PDFDocument, StandardFonts, rgb, PDFName, PDFString } = lib;
const content = JSON.parse(fs.readFileSync(path.join(root, 'assets/resumes/content.json')));
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
for (const lang of ['en','pt']) {
  const c = content[lang];
  const doc = await PDFDocument.create();
  doc.setTitle(`${content.name} | ${c.title}`);
  doc.setAuthor(content.name);
  doc.setSubject('Game design portfolio resume');
  doc.setLanguage(lang === 'pt' ? 'pt-BR' : 'en');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([595.28,841.89]);
  let y = 805;
  const margin = 38, width = 519;
  const ink = rgb(.09,.12,.16), accent = rgb(.48,.04,.12);
  function lines(text, font, size, maxWidth) {
    const out=[]; let line='';
    for(const word of text.split(/\s+/)) {
      const next = line ? line+' '+word : word;
      if(font.widthOfTextAtSize(next,size)>maxWidth && line) {out.push(line);line=word;} else line=next;
    }
    if(line) out.push(line);
    return out;
  }
  function text(str, {font=regular,size=10,gap=3,indent=0,color=ink}={}) {
    for(const line of lines(str,font,size,width-indent)) {
      page.drawText(line,{x:margin+indent,y,size,font,color}); y-=size+3;
    }
    y-=gap;
  }
  function link(label,url) {
    const size=8.3, w=regular.widthOfTextAtSize(label,size);
    page.drawText(label,{x:margin,y,size,font:regular,color:accent});
    const annot=doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[margin,y-2,margin+w,y+size],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:PDFString.of(url)}});
    let annots=page.node.lookup(PDFName.of('Annots'));
    if(!annots) {page.node.set(PDFName.of('Annots'),doc.context.obj([])); annots=page.node.lookup(PDFName.of('Annots'));}
    annots.push(doc.context.register(annot));
    y-=12;
  }
  function heading(t) { y-=4;text(t,{font:bold,size:9,color:accent,gap:4}); }
  text(content.name,{font:bold,size:19,gap:2});
  text(c.title,{size:11,gap:1});
  text(`${content.email} | ${c.location}`,{size:8.5,gap:0});
  link('reaperbornforge.github.io | Portfolio', content.portfolio+'&lang='+lang);
  link('linkedin.com/in/otavioantonio', content.linkedin);
  y-=3;text(c.summary,{size:10,gap:4});
  heading(c.skillsTitle);
  c.skills.forEach(s=>text(s,{size:10,gap:1}));
  heading(c.projectsTitle);
  for(const project of c.projects) {
    text(project.name,{font:bold,size:10,gap:0});
    text(project.role,{size:9.3,color:accent,gap:2});
    for(const bullet of project.bullets) text('• '+bullet,{size:10,indent:6,gap:1});
    y-=2;
  }
  heading(c.educationTitle);
  c.education.forEach(s=>text(s,{size:10,gap:1}));
  if(y<31) throw Error(`Resume overflow: ${lang}, bottom ${y}`);
  page.drawText(`${lang==='pt'?'Atualizado':'Updated'}: ${content.updated}`,{x:margin,y:19,size:7,font:regular,color:rgb(.4,.4,.4)});
  const filename = lang==='pt'?'Curriculo - Otavio Rosindo.pdf':'Resume - Otavio Rosindo.pdf';
  fs.writeFileSync(path.join(root,'assets',filename),await doc.save());
  const html=`<!doctype html><html lang="${lang==='pt'?'pt-BR':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(content.name)} · ${lang==='pt'?'Currículo':'Resume'}</title><style>body{font:15px/1.6 system-ui,sans-serif;color:#18212b;max-width:850px;margin:40px auto;padding:0 24px}h1{font-size:30px;margin-bottom:0}h2{font-size:16px;color:#8b0e1f;margin-top:28px}h3{font-size:17px;margin-bottom:0}a{color:#8b0e1f}p{margin:8px 0}li{margin:6px 0}.role{color:#555}@media print{body{font-size:10pt;margin:0;max-width:none}nav{display:none}article{break-inside:avoid}h2{margin-top:16px}}</style></head><body><nav><a href="/?view=recruiter&amp;lang=${lang}">${lang==='pt'?'Portfólio':'Portfolio'}</a> · <a href="/assets/${encodeURIComponent(filename)}">PDF</a> · <a href="${lang==='pt'?'en':'pt'}.html">${lang==='pt'?'English':'Português'}</a></nav><main><h1>${escape(content.name)}</h1><p>${escape(c.title)} · ${escape(c.location)}</p><p><a href="mailto:${content.email}">${content.email}</a> · <a href="${content.linkedin}">LinkedIn</a></p><p>${escape(c.summary)}</p><h2>${c.skillsTitle}</h2>${c.skills.map(s=>`<p>${escape(s)}</p>`).join('')}<h2>${c.projectsTitle}</h2>${c.projects.map(p=>`<article><h3><a href="${p.url}">${p.name}</a></h3><p class="role">${escape(p.role)}</p><ul>${p.bullets.map(b=>`<li>${escape(b)}</li>`).join('')}</ul></article>`).join('')}<h2>${c.educationTitle}</h2>${c.education.map(s=>`<p>${escape(s)}</p>`).join('')}</main><footer><p>${lang==='pt'?'Atualizado':'Updated'}: <time datetime="${content.updated}">${content.updated}</time></p></footer></body></html>`;
  fs.writeFileSync(path.join(root,'assets/resumes',lang+'.html'),html);
  console.log(`${filename}: 1 page, bottom content at ${y.toFixed(1)}pt`);
}
