import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
export function createPreview(root=project) {
  return http.createServer(async(req,res)=>{
    try {
      let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'');
      if(!relative||relative.endsWith('/')) relative+='index.html';
      if(!/^(index\.html|404\.html|robots\.txt|sitemap\.xml|assets\/|projects\/)/.test(relative)) throw Error('Not public');
      const file=path.resolve(root,relative);
      if(!file.startsWith(path.resolve(root)+path.sep)) throw Error('Invalid path');
      const body=await fs.readFile(file);
      res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
      res.end(body);
    } catch {res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const server=createPreview(process.argv[2]?path.resolve(process.argv[2]):project);
  server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
}
