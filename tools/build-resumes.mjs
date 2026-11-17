// Gera assets/resumes/{en,pt}.html a partir de assets/resumes/content.json.
// Os PDFs publicos ficam em assets/cv/ (copiados do Drive) e NAO sao gerados aqui.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const content=JSON.parse(fs.readFileSync(path.join(root,'assets/resumes/content.json'),'utf8'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const css='body{font:15px/1.6 system-ui,sans-serif;color:#18212b;max-width:850px;margin:40px auto;padding:0 24px}h1{font-size:30px;margin-bottom:0}h2{font-size:16px;color:#8b0e1f;margin-top:28px}h3{font-size:17px;margin-bottom:0}a{color:#8b0e1f}p{margin:8px 0}li{margin:6px 0}.role{color:#555}@media print{body{font-size:10pt;margin:0;max-width:none}nav{display:none}article{break-inside:avoid}h2{margin-top:16px}}';
for(const key of ['en','pt']){
  const c=content[key];const L=key.toUpperCase();
  const html=`<!doctype html><html lang="${key==='pt'?'pt-BR':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.name)} · ${c.nav.title}</title><style>${css}</style></head><body><nav><a href="/?view=recruiter&amp;lang=${key}">${c.nav.portfolio}</a> · <a href="/assets/cv/Otavio_Rosindo_CV_Game_Designer_${L}.pdf" download="Otavio_Rosindo_CV_Game_Designer_${L}.pdf">PDF</a> · <a href="${c.nav.otherHref}">${c.nav.other}</a></nav><main><h1>${esc(c.name)}</h1><p>${esc(c.headline)}</p><p><a href="mailto:otaviorosindo@gmail.com">otaviorosindo@gmail.com</a> · <a href="https://reaperbornforge.github.io">reaperbornforge.github.io</a> · <a href="https://www.linkedin.com/in/otavioantonio/">LinkedIn</a> · ${esc(c.contact)}</p><h2>${c.summaryTitle}</h2><p>${esc(c.summary)}</p><h2>${c.skillsTitle}</h2>${c.skills.map(s=>`<p>${esc(s)}</p>`).join('')}<h2>${esc(c.projectsTitle)}</h2>${c.projects.map(p=>`<article><h3><a href="${p.url}">${esc(p.name)}</a></h3><p class="role">${esc(p.role)} | ${esc(p.period)}</p><p>${esc(p.meta)}</p><ul>${p.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></article>`).join('')}<h2>${c.eduTitle}</h2>${c.education.map(s=>`<p>${esc(s)}</p>`).join('')}</main></body></html>`;
  fs.writeFileSync(path.join(root,'assets/resumes',key+'.html'),html);
  console.log(key+'.html');
}
