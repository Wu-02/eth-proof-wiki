import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..',process.env.OUTPUT||'public');
const info=JSON.parse(await fs.readFile(path.join(root,'build-info.json'),'utf8'));
const errors=[];let checked=0;
async function walk(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Symlink in public output');const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=await walk(root),fileSet=new Set(files);const html=new Map();for(const file of files.filter(p=>p.endsWith('.html')))html.set(file,await fs.readFile(file,'utf8'));
for(const [file,body] of html){const seen=new Set();for(const [,id] of body.matchAll(/\bid="([^"]+)"/g)){if(seen.has(id))errors.push(`${file}: duplicate id ${id}`);seen.add(id);}}
for(const [file,body] of html)for(const [,raw] of body.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|data:)/.test(raw))continue;checked++;
  const href=raw.replaceAll('&amp;','&');const url=new URL(href,'https://preview.invalid'+info.basePath+path.relative(root,file));
  if(url.origin!=='https://preview.invalid')continue;
  if(!url.pathname.startsWith(info.basePath)){errors.push(`${file}: outside base path ${raw}`);continue;}
  let local=path.join(root,decodeURIComponent(url.pathname.slice(info.basePath.length)));if(url.pathname.endsWith('/'))local=path.join(local,'index.html');
  if(!fileSet.has(local)){errors.push(`${file}: missing ${raw}`);continue;}
  if(url.hash&&html.has(local)){const id=decodeURIComponent(url.hash.slice(1));if(!html.get(local).includes(`id="${id}"`)&&!html.get(local).includes(`id='${id}'`))errors.push(`${file}: missing anchor ${raw}`);}
}
for(const [file,body] of html)for(const [,src] of body.matchAll(/<script[^>]+src="([^"]+)"/g)){if(new URL(src,'https://preview.invalid'+info.basePath).origin!=='https://preview.invalid')errors.push(`External executable dependency in ${file}`);}
for(const file of files.filter(p=>p.endsWith('.css'))){const css=await fs.readFile(file,'utf8');for(const [,raw] of css.matchAll(/url\(["']?([^)'"]+)["']?\)/g)){if(raw.startsWith('data:'))continue;if(/^(?:https?:)?\/\//.test(raw)){errors.push(`External CSS resource in ${file}: ${raw}`);continue;}const local=path.resolve(path.dirname(file),raw);checked++;if(!fileSet.has(local))errors.push(`Missing CSS resource in ${file}: ${raw}`);}}
for(const file of files){const rel=path.relative(root,file);if(/(?:^|\/)(?:private|raw|qa|drafts|\.git|\.obsidian)(?:\/|$)/i.test(rel)||/\.(?:md|tex|pdf|log|yml|yaml)$/i.test(rel))errors.push(`Private/source file leaked: ${rel}`);}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checked ${checked} internal URLs across ${html.size} HTML pages; no broken links or source/private leaks.`);
