import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createCanvas,loadImage} from '@napi-rs/canvas';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ids=[
 'fV35si1gdQ7jcP4h1RWUzpUsmOQg952UPBLjukVnnza_jb_VY5Tg5HRUoKUgfdZKqAuYdIqr-hsDUKXA6wb8rg',
 'k2pAyTKEuY1dy4_fwJhdvoGgy7p_7ccpZFaaVsYzYEZveYnnP_eSoNaRsCGR--MDhbjTT_Y78nPkkbDk1dzXUWc',
 'oZ8MNahQRfz2IJ45dKfx5vJSdjfmv8rGjh1U_B1pRiuf-gSHCKEd324C8iWv1Kvq8OpOtgRc7H62DUpGiMAqfjU',
 'KWdhDq532VE_mYYnYZw788wtfhd5zBeTSQLCm1FxN0j-rivUALX4YXCefS6ipEji32F0BA_wcJ1H4yLHFCg9',
 '06Ahuekkb-imW2P_YISHzc2C9-c4QxFsY2rZh5KfNgti1bpOreADoY_jM1t8MPj7DLlI26yFl4ddSqO_qGT4fQ',
 'IncUWPX9FLMr4sCJccFZb_jRQ2ltLoWyUJ_-ZTe28CWLl3gLKZZUmMpse19rbPZ5PeO_WG_6YNf9duRU83UT',
 'RXPjOhHM3xMyaHJMj0xlkpiEn6JA2RxMsiW2Zcw1GYD6zPVPSatxjh58do1agkJqEJvwbI6U2pwHaRkvty2o'
];
const target=path.join(root,'assets/HeadVolleyClash');
const files=[];
for(const [index,id] of ids.entries()) {
 const url='https://play-lh.googleusercontent.com/'+id+'=w1280';
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
 if(!response.ok) throw Error(`${response.status}: ${url}`);
 const original=Buffer.from(await response.arrayBuffer());
 const image=await loadImage(original);
 const canvas=createCanvas(image.width,image.height);
 canvas.getContext('2d').drawImage(image,0,0);
 const data=await canvas.encode('webp',88);
 const hash=crypto.createHash('sha256').update(data).digest('hex');
 const file=`google-play-${String(index+1).padStart(2,'0')}-${hash.slice(0,12)}.webp`;
 fs.writeFileSync(path.join(target,file),data);
 files.push({file,source:url,width:image.width,height:image.height,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')});
 console.log(`${file}: ${image.width}x${image.height}, ${data.length} bytes`);
}
fs.writeFileSync(path.join(target,'sources.json'),JSON.stringify({listing:'https://play.google.com/store/apps/details?id=com.DarkReaper.HeadVolleyClash',retrievedAt:new Date().toISOString(),files},null,2)+'\n');
