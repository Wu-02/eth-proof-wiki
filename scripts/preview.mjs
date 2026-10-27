import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const config=JSON.parse(await fs.readFile('site.config.json','utf8'));
const base=process.env.BASE_PATH || config.basePath;
const root=path.resolve(process.env.OUTPUT || 'public');
const types={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer(async(req,res)=>{try {const url=new URL(req.url,'http://localhost');if(url.pathname==='/'&&base!=='/'){res.writeHead(302,{Location:base});return res.end();}if(!url.pathname.startsWith(base)){res.writeHead(404);return res.end('Outside project base path');}let rel=decodeURIComponent(url.pathname.slice(base.length));if(!rel||rel.endsWith('/'))rel+='index.html';const file=path.resolve(root,rel);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${Number(process.env.PORT)||4173}${base}`));
