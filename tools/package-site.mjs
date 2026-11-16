import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
fs.mkdirSync(output,{recursive:true});
const files=['index.html','404.html','robots.txt','sitemap.xml','.nojekyll'];
function collect(relative) {
  for(const entry of fs.readdirSync(path.join(root,relative),{withFileTypes:true})) {
    const next=relative+'/'+entry.name;
    if(entry.isDirectory()) collect(next);
    else if(/\.(html|css|js|json|pdf|png|webp|jpe?g|svg|ico|woff2?)$/i.test(entry.name)) files.push(next);
  }
}
collect('assets');collect('projects');
// Remove only obsolete generated files listed in the previous manifest.
const manifestPath=path.join(root,'artifacts/publication-manifest.json');
if(fs.existsSync(manifestPath)) {
  const previous=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  for(const entry of previous.files) if(!files.includes(entry.path)) {
    const obsolete=path.resolve(output,entry.path);
    if(!obsolete.startsWith(output+path.sep)) throw Error('Invalid previous artifact path');
    if(fs.existsSync(obsolete)&&fs.lstatSync(obsolete).isFile()) fs.unlinkSync(obsolete);
  }
}
const manifest={site:'Reaperborn Forge',createdAt:new Date().toISOString(),files:[]};
for(const file of files.sort()) {
  const data=fs.readFileSync(path.join(root,file));
  const target=path.join(output,file);
  fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);
  manifest.files.push({path:file,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')});
}
fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});
fs.writeFileSync(path.join(root,'artifacts/publication-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.files.length} public files in dist/. Manifest: artifacts/publication-manifest.json`);
