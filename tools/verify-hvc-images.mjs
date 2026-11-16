import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {loadImage} from '@napi-rs/canvas';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'assets/HeadVolleyClash');
const sources=JSON.parse(fs.readFileSync(path.join(dir,'sources.json'),'utf8'));
const gallery=JSON.parse(fs.readFileSync(path.join(dir,'images.json'),'utf8'));
assert.equal(gallery.length,7);
assert.equal(sources.files.length,7);
for(const [index,entry] of sources.files.entries()) {
 assert.equal(gallery[index].src,entry.file);
 assert.equal(new URL(entry.source).hostname,'play-lh.googleusercontent.com');
 const data=fs.readFileSync(path.join(dir,entry.file));
 assert.equal(crypto.createHash('sha256').update(data).digest('hex'),entry.sha256);
 const image=await loadImage(data);
 assert.equal(image.width,1280);assert.equal(image.height,720);
 assert(gallery[index].caption.en&&gallery[index].caption.pt);
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const study=fs.readFileSync(path.join(root,'projects/head-volley-clash/index.html'),'utf8');
assert.equal((home.match(/src="assets\/HeadVolleyClash\/01.webp"/g)||[]).length,2);
assert(study.includes('src="/assets/HeadVolleyClash/01.webp"'));
assert(!home.includes('src="assets/posters/head-volley-clash.webp"'));
assert(!home.includes('src="assets/Head_Volley_Clash_itch_cover_630x500.png"'));
assert(!study.includes('Screenshots and systems below document the earlier version'));
console.log('PASS: 7 official Google Play images, hashes, dimensions, captions, Recruiter/Studio highlights and case cover.');
