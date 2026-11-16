import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'assets/HeadVolleyClash');
const sources=JSON.parse(fs.readFileSync(path.join(dir,'sources.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'images.json'),'utf8'));
const pages=['index.html','projects/head-volley-clash/index.html','tools/verify-hvc-images.mjs'];
for(const [i,entry] of sources.files.entries()) {
  const previous=entry.file;
  const next=`google-play-${String(i+1).padStart(2,'0')}-${entry.sha256.slice(0,12)}.webp`;
  if(previous===next) continue;
  fs.renameSync(path.join(dir,previous),path.join(dir,next));
  entry.file=next;
  manifest[i].src=next;
  for(const page of pages) {
    const target=path.join(root,page);
    const s=fs.readFileSync(target,'utf8');
    fs.writeFileSync(target,s.replaceAll('HeadVolleyClash/'+previous,'HeadVolleyClash/'+next));
  }
}
fs.writeFileSync(path.join(dir,'sources.json'),JSON.stringify(sources,null,2)+'\n');
fs.writeFileSync(path.join(dir,'images.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('HVC screenshots now have content-versioned filenames.');
