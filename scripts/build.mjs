import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import YAML from 'yaml';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const slug = s => String(s).trim().toLowerCase().replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-|-$/g, '') || 'section';
export function normalizeBase(value = '/eth-proof-wiki/') {
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(value)) throw new Error('Base path must be / or /project-name/');
  return value;
}
export const isProofNode = n => /^(?:[0-9]+|[A-Z])\.[0-9]+$/.test(n.id);
export const targetId = s => String(s).replace(/^\[\[|\]\]$/g, '').split('|')[0].split('#')[0].replace(/\.md$/, '').trim();
export function parseNote(text, filename) {
  const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!front) return null;
  const meta = YAML.parse(front[1], {maxAliasCount: 20});
  if (!meta || meta.publish !== true) return null;
  const id = String(meta.id || path.basename(filename, '.md'));
  if (!/^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/.test(id)) throw new Error(`Invalid stable id ${id}: ${filename}`);
  if (id !== path.basename(filename, '.md')) throw new Error(`Filename and id must match: ${filename}`);
  if (!meta.title || typeof meta.title !== 'string') throw new Error(`Missing title: ${filename}`);
  for (const key of ['depends_on','implementation_options','supporting_dependencies']) if (meta[key] != null && !Array.isArray(meta[key])) throw new Error(`${key} must be an array: ${filename}`);
  return {...meta, source_label:meta.source_label == null ? undefined : String(meta.source_label), id, filename, body:text.slice(front[0].length), depends_on:(meta.depends_on || []).map(targetId), supporting_dependencies:(meta.supporting_dependencies || []).map(targetId), implementation_options:(meta.implementation_options || []).map(targetId), links:new Set(), headings:[]};
}
export function noteUrl(note, base) { return base + (['index','home'].includes(note.id) ? '' : note.id + '/'); }
export function validateNotes(notes) {
  const map = new Map();
  for (const note of notes) {
    if (map.has(note.id)) throw new Error(`Duplicate note: ${note.id}`);
    map.set(note.id, note);
  }
  for (const note of notes) for (const id of [...note.depends_on, ...note.implementation_options, ...note.supporting_dependencies]) {
    if (!map.has(id)) throw new Error(`Missing/private dependency ${id} in ${note.id}`);
    if (id === note.id) throw new Error(`Self dependency: ${id}`);
  }
  const visiting = new Set(), visited = new Set();
  function visit(id) { if(visiting.has(id)) throw new Error(`Dependency cycle at ${id}`); if(visited.has(id)) return; visiting.add(id); for(const dep of map.get(id).depends_on) visit(dep); visiting.delete(id); visited.add(id); }
  for(const id of map.keys()) visit(id);
  return map;
}
function mathHtml(source, display) {
  return katex.renderToString(source, {displayMode:display, throwOnError:true, trust:false, strict:'error', maxExpand:1000, output:'htmlAndMathml', macros:{'\\poly':'\\operatorname{poly}', '\\SIZE':'\\operatorname{SIZE}', '\\NP':'\\mathsf{NP}', '\\SAT':'\\mathsf{SAT}'}});
}
export function renderer(notes, base, note) {
  const md = new MarkdownIt({html:false, linkify:true, typographer:false});
  md.inline.ruler.before('escape','proof_math',(state,silent)=>{
    const s = state.src, pos = state.pos;
    const open = s.startsWith('\\(',pos) ? '\\(' : (s[pos] === '$' && s[pos+1] !== '$' ? '$' : null);
    if(!open) return false;
    const close = open === '$' ? '$' : '\\)';
    let end = pos + open.length;
    while((end = s.indexOf(close,end)) >= 0) { if(s[end-1] !== '\\') break; end += close.length; }
    if(end < 0 || s.slice(pos+open.length,end).includes('\n')) return false;
    if(!silent) {const t=state.push('proof_math','math',0);t.content=s.slice(pos+open.length,end);}
    state.pos=end+close.length;return true;
  });
  md.renderer.rules.proof_math = (tokens,i)=>'<span class="math-inline">'+mathHtml(tokens[i].content,false)+'</span>';
  md.block.ruler.before('fence','proof_math_block',(state,start,end,silent)=>{
    const line = state.src.slice(state.bMarks[start]+state.tShift[start],state.eMarks[start]).trim();
    const open=line.startsWith('$$')?'$$':line.startsWith('\\[')?'\\[':null;
    if(!open)return false;
    const close=open==='$$'?'$$':'\\]';let content=line.slice(open.length), next=start;
    if(content.endsWith(close))content=content.slice(0,-close.length);
    else { let found=false;content+='\n';for(next=start+1;next<end;next++){const part=state.src.slice(state.bMarks[next]+state.tShift[next],state.eMarks[next]);if(part.trim().endsWith(close)){content+=part.slice(0,part.lastIndexOf(close));found=true;break;}content+=part+'\n';}if(!found)throw new Error(`Unclosed display math in ${note.id}, line ${start+1}`); }
    if(silent)return true;const token=state.push('proof_math_block','math',0);token.content=content.trim();token.map=[start,next+1];token.block=true;state.line=next+1;return true;
  },{alt:['paragraph','reference','blockquote','list']});
  md.renderer.rules.proof_math_block=(tokens,i)=>'<div class="math-display">'+mathHtml(tokens[i].content,true)+'</div>\n';
  const blockIds=new Set();
  md.block.ruler.before('paragraph','proof_block_id',(state,start,end,silent)=>{
    const line=state.src.slice(state.bMarks[start]+state.tShift[start],state.eMarks[start]).trim();
    const match=line.match(/^\^([A-Za-z0-9][A-Za-z0-9-]*)$/);if(!match)return false;
    if(silent)return true;if(blockIds.has(match[1]))throw new Error(`Duplicate block id ${match[1]} in ${note.id}`);blockIds.add(match[1]);
    const token=state.push('proof_block_id','span',0);token.content=match[1];token.block=true;token.map=[start,start+1];state.line=start+1;return true;
  },{alt:['paragraph']});
  md.core.ruler.after('block','position_block_anchors',state=>{
    for(let i=0;i<state.tokens.length;i++){
      const marker=state.tokens[i];if(marker.type!=='proof_block_id')continue;
      marker.type='proof_block_anchor';let previous=i-1;
      if(previous<0)throw new Error(`Block id ${marker.content} has no preceding block in ${note.id}`);
      if(state.tokens[previous].nesting===-1){let balance=-1;while(--previous>=0){balance+=state.tokens[previous].nesting;if(balance===0)break;}}
      if(previous<0)throw new Error(`Cannot attach block id ${marker.content} in ${note.id}`);
      state.tokens.splice(i,1);state.tokens.splice(previous,0,marker);
    }
  });
  md.renderer.rules.proof_block_anchor=(tokens,i)=>`<span class="block-anchor" id="${tokens[i].content}" aria-hidden="true"></span>\n`;
  md.inline.ruler.before('image','wikiembed',(state)=>{if(state.src.startsWith('![[',state.pos)) throw new Error(`Obsidian transclusion is not supported yet; use a source-section wikilink instead (${note.id})`);return false;});
  md.inline.ruler.before('link','wikilink',(state,silent)=>{
    if(!state.src.startsWith('[[',state.pos))return false;
    const end=state.src.indexOf(']]',state.pos+2);if(end<0)return false;
    const raw=state.src.slice(state.pos+2,end), [destination, alias] = raw.split('|');
    const [rawId, heading] = destination.split('#');const id=targetId(rawId || note.id);const dest=notes.get(id);
    if(!dest)throw new Error(`Broken/private wikilink [[${raw}]] in ${note.id}`);
    if(!silent){const t=state.push('wiki','a',0);t.meta={href:noteUrl(dest,base)+(heading?'#'+(heading.startsWith('^')?heading.slice(1):slug(heading)):''),label:alias||dest.title};note.links.add(id);}
    state.pos=end+2;return true;
  });
  md.renderer.rules.wiki=(tokens,i)=>`<a class="wikilink" href="${escapeHtml(tokens[i].meta.href)}">${escapeHtml(tokens[i].meta.label)}</a>`;
  const defaultLink=md.renderer.rules.link_open || ((tokens,idx,opts,env,self)=>self.renderToken(tokens,idx,opts));
  md.renderer.rules.link_open=(tokens,idx,opts,env,self)=>{
    const token=tokens[idx];let href=token.attrGet('href');
    if(href && /\.md(?:#.*)?$/.test(href) && !/^https?:/.test(href)){
      const [file,anchor]=href.split('#'), dest=notes.get(path.basename(decodeURIComponent(file),'.md'));
      if(!dest)throw new Error(`Broken/private Markdown link ${href} in ${note.id}`);
      note.links.add(dest.id);href=noteUrl(dest,base)+(anchor?'#'+slug(decodeURIComponent(anchor)):'');token.attrSet('href',href);
    }
    if(href?.startsWith('http'))token.attrSet('rel','noopener noreferrer');
    return defaultLink(tokens,idx,opts,env,self);
  };
  md.renderer.rules.image=()=>{throw new Error(`Images must use the explicitly reviewed asset pipeline (${note.id})`);};
  const used=new Map();
  md.renderer.rules.heading_open=(tokens,idx,opts,env,self)=>{ const title=tokens[idx+1].content;const root=slug(title);const count=(used.get(root)||0)+1;used.set(root,count);const id=root+(count>1?'-'+count:'');tokens[idx].attrSet('id',id);note.headings.push({id,title,level:Number(tokens[idx].tag.slice(1))});return self.renderToken(tokens,idx,opts); };
  return md;
}
async function walk(dir, prefix='') { const result=[];for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name,'en'))){if(entry.name.startsWith('.')||entry.name.startsWith('_')||['private','raw','qa','drafts'].includes(entry.name))continue;const rel=path.join(prefix,entry.name);if(entry.isSymbolicLink())throw new Error(`Symlink excluded: ${rel}`);if(entry.isDirectory())result.push(...await walk(path.join(dir,entry.name),rel));else if(entry.name.endsWith('.md'))result.push(rel);}return result;}
function listNotes(ids,map,base,empty='暂无'){return ids.length?'<ul class="note-links">'+ids.map(id=>`<li><a href="${noteUrl(map.get(id),base)}">${escapeHtml(map.get(id).title)}</a></li>`).join('')+'</ul>':`<p class="muted">${empty}</p>`;}
export function sourceDiagram(svg,map,base) {
  if (/<(?:script|foreignObject|image|iframe)\b|\son[a-z]+\s*=/i.test(svg)) throw new Error('Unsafe SVG reference');
  svg=svg.replace(/<\?xml[^>]*>/g,'').replace(/<!DOCTYPE[\s\S]*?>/g,'').replace(/<!--([\s\S]*?)-->/g,'');
  let count=0;
  svg=svg.replace(/(<g id="node\d+" class="node">\s*<title>)([^<]+)(<\/title>[\s\S]*?<a )xlink:href="[^"]*"/g,(all,before,id,middle)=>{
    const note=map.get(id); if(!note)throw new Error(`Source SVG node missing from published notes: ${id}`);count++;
    return `${before}${id}${middle}href="${noteUrl(note,base)}" xlink:href="${noteUrl(note,base)}" target="_top"`;
  });
  if(count!==33)throw new Error(`Source diagram expected 33 clickable nodes, found ${count}`);
  if(/xlink:href="https?:/.test(svg))throw new Error('Unmapped external diagram link');
  return svg.replace('<svg ','<svg role="img" aria-label="用户原始依赖图参考：33个节点，43条箭头；C.1标题已纠正" ');
}
function graphHtml(notes,map,base,reference){
  const nodes=notes.filter(isProofNode);const groups=[...new Set(nodes.map(n=>n.group || '其他'))];
  return `${reference ? `<section class="source-diagram"><h2>原图对照 · 可点击节点</h2><p class="muted">保留用户图的 33 个节点和 43 条箭头，仅纠正 C.1 的“上界”为“超线性电路下界”。原图箭头角色并不都等同于严格的直接证明依赖；下方关系与各节点页面以校核后的 Markdown 为准。</p><div class="diagram-scroll">${reference}</div></section>` : ''}<h2>校核后的依赖导航</h2><div class="graph-controls"><label>定位节点 <select id="graph-select"><option value="">选择一个节点</option>${nodes.map(n=>`<option value="${n.id}">${escapeHtml(n.title)}</option>`).join('')}</select></label><button type="button" id="graph-reset">清除高亮</button></div><p class="muted">连线方向：前置节点 → 后继节点。选择节点可高亮它与直接依赖；点击节点进入页面。</p><div class="graph-columns">${groups.map((g,i)=>`<section class="graph-group tone-${i%5}"><h3>${escapeHtml(g)}</h3>${nodes.filter(n=>(n.group||'其他')===g).map(n=>`<article class="graph-node" data-node="${n.id}" data-deps="${n.depends_on.join(' ')}"><a href="${noteUrl(n,base)}"><span class="node-label">${escapeHtml(n.source_label)}</span>${escapeHtml(n.title)}</a><div class="graph-prereqs">${n.depends_on.length?n.depends_on.map(id=>`<a href="${noteUrl(map.get(id),base)}" title="${escapeHtml(map.get(id).title)}">${escapeHtml(map.get(id).source_label||map.get(id).title)}</a>`).join(' <span aria-hidden="true">＋</span> ')+' <span aria-hidden="true">→</span> '+escapeHtml(n.source_label):'起点 / 本图未列前置'}</div></article>`).join('')}</section>`).join('')}</div>`;
}
function layout(note,html,notes,map,base,config){
  const home=notes.find(n=>['index','home'].includes(n.id)) || notes[0];
  const topics=notes.filter(n=>['topic','主题'].includes(n.kind)||n.id.startsWith('topic-'));
  const nav=notes.filter(n=>['reading-route','dependency-graph'].includes(n.id));
  const successors=notes.filter(n=>n.depends_on.includes(note.id)).map(n=>n.id);
  const backlinks=notes.filter(n=>n.id!==note.id && n.links.has(note.id)).map(n=>n.id);
  const toc=note.headings.filter(h=>h.level>=2&&h.level<=3);
  const isGraph=['dependency-graph','graph'].includes(note.id);
  const isHome=note===home;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeHtml(note.summary||note.title)}"><meta name="color-scheme" content="light"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'"><title>${escapeHtml(note.title)} · ${escapeHtml(config.title)}</title><link rel="icon" href="${base}assets/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}assets/katex/katex.min.css"><link rel="stylesheet" href="${base}assets/style.css"><script src="${base}assets/app.js" defer></script></head><body data-base="${base}" data-page="${note.id}"><a class="skip" href="#main">跳至正文</a><header class="topbar"><a class="brand" href="${noteUrl(home,base)}"><span class="brand-mark">∴</span><span>ETH <b>证明图谱</b></span></a><div class="top-actions"><span class="phase">第一阶段 · 证明导航</span><button id="search-open" type="button" aria-haspopup="dialog"><span>搜索笔记</span><kbd>/</kbd></button><button type="button" id="menu-toggle" aria-label="切换导航" aria-expanded="false">☰</button></div></header><div class="shell"><aside class="sidebar" id="sidebar"><nav aria-label="主导航"><p class="nav-caption">从这里开始</p><a href="${noteUrl(home,base)}" ${isHome?'aria-current="page"':''}>总览</a>${nav.map(n=>`<a href="${noteUrl(n,base)}" ${n.id===note.id?'aria-current="page"':''}>${escapeHtml(n.title)}</a>`).join('')}<p class="nav-caption">五个证明主题</p>${topics.map(n=>`<a href="${noteUrl(n,base)}" ${n.id===note.id?'aria-current="page"':''}>${escapeHtml(n.title)}</a>`).join('')}<p class="nav-caption">节点索引 <span>${notes.filter(isProofNode).length}</span></p>${notes.filter(isProofNode).map(n=>`<a class="node-nav" href="${noteUrl(n,base)}" ${n.id===note.id?'aria-current="page"':''}><span>${escapeHtml(n.source_label)}</span>${escapeHtml(n.title.replace(new RegExp('^'+n.source_label.replaceAll('.','\\.')+'\\s*'),''))}</a>`).join('')}</nav><div class="sidebar-note">同一份 Markdown<br>Obsidian ↔ 静态网页</div></aside><main id="main" class="${isHome?'home':''}"><div class="eyebrow">${escapeHtml(note.group || 'RESEARCH NOTEBOOK')}${note.source_label?' / '+escapeHtml(note.source_label):''}</div><h1>${escapeHtml(note.title)}</h1><div class="metadata"><span class="status">${escapeHtml(note.status || '结构初稿 · 待审阅')}</span>${note.source_label?'<span>原文编号 '+escapeHtml(note.source_label)+'</span>':''}</div><div class="notice"><strong>内容状态</strong> 当前为证明导航与思路梳理。“证明思路”与“原文中文译文”分层保留，后者待逐段补齐并校核。</div><article class="prose">${html}</article>${isGraph?graphHtml(notes,map,base,config.diagramMarkup):''}${isProofNode(note)?`<section class="relationships"><div><h2 id="prerequisites">前置依赖</h2>${listNotes(note.depends_on,map,base,'本图未列前置节点')}</div><div><h2 id="successors">后继引用</h2>${listNotes(successors,map,base,'本图未列后继节点')}</div></section>`:''}${note.supporting_dependencies.length?`<section class="supporting"><h2>补充支撑</h2><p class="muted">这些节点提供参数、位长或实现细节等补充支撑，与严格依赖分开记录。</p>${listNotes(note.supporting_dependencies,map,base)}</section>`:''}${note.implementation_options.length?`<section class="implementations"><h2>可选实现</h2><p class="muted">这些节点提供可替换的实现，不作为本引理的直接逻辑前提。</p>${listNotes(note.implementation_options,map,base)}</section>`:''}<section class="backlinks"><h2 id="backlinks">被哪些笔记引用</h2>${listNotes(backlinks,map,base,'暂无其他正文链接到此页')}</section><footer>Markdown 是唯一内容源 · 依赖关系是阅读导航，不等同于完整证明。<br><a href="${base}dependency-graph/">查看依赖图</a><span> · </span><a href="${base}reading-route/">继续阅读</a><span> · </span><a href="${base}assets/licenses/OpenAI-math-Apache-2.0.txt">原文许可 · Apache 2.0</a><br>原文作者 OpenAI · 本站为中文证明导航及译文改编</footer></main><aside class="toc"><p class="nav-caption">本页目录</p><nav aria-label="本页目录">${toc.map(h=>`<a class="depth-${h.level}" href="#${h.id}">${escapeHtml(h.title)}</a>`).join('')}${isProofNode(note)?'<a href="#prerequisites">前置依赖</a><a href="#successors">后继引用</a>':''}<a href="#backlinks">被引用回链</a></nav><div class="toc-card">先看结构，<br>再读证明，<br>最后逐段译审。</div></aside></div><dialog id="search-dialog"><form method="dialog"><label for="search-input">搜索全部公开笔记</label><button value="close" aria-label="关闭搜索">×</button></form><input id="search-input" type="search" placeholder="定理编号、中文概念或英文术语…" autocomplete="off"><p id="search-status" aria-live="polite"></p><ul id="search-results"></ul><p class="search-hint">Esc 关闭 · 搜索完全在当前浏览器内进行</p></dialog></body></html>`;
}
export async function build({root=ROOT,basePath,output='public'}={}){
  const config=JSON.parse(await fs.readFile(path.join(root,'site.config.json'),'utf8'));const base=normalizeBase(basePath || process.env.BASE_PATH || config.basePath);
  const files=await walk(path.join(root,'vault'));const notes=[];
  for(const file of files){const note=parseNote(await fs.readFile(path.join(root,'vault',file),'utf8'),file);if(note)notes.push(note);}
  if(!notes.length)throw new Error('No explicitly published notes');notes.sort((a,b)=>(a.order??999)-(b.order??999)||a.id.localeCompare(b.id,'en',{numeric:true}));
  const map=validateNotes(notes);if(!map.has('index')&&!map.has('home'))throw new Error('Missing published home page (index.md or home.md)');if(map.has('index')&&map.has('home'))throw new Error('Only one home page may be published: index or home');
  try { config.diagramMarkup=sourceDiagram(await fs.readFile(path.join(root,'web/dependency-reference.svg'),'utf8'),map,base); } catch(e) { if(e.code!=='ENOENT') throw e; }
  const rendered=new Map();for(const note of notes){try{rendered.set(note.id,renderer(map,base,note).render(note.body.replace(/^\s*# [^\r\n]*\r?\n/,'')));}catch(e){throw new Error(`${note.filename}: ${e.message}`,{cause:e});}}
  if(!/^public(?:-[A-Za-z0-9_-]+)?$/.test(output))throw new Error('Output must use a dedicated public or public-* directory');const out=path.resolve(root,output);if(out===root||!out.startsWith(root+path.sep))throw new Error('Output must be inside project root');await fs.rm(out,{recursive:true,force:true});await fs.mkdir(path.join(out,'assets','katex'),{recursive:true});
  for(const file of ['style.css','app.js','icon.svg'])await fs.copyFile(path.join(root,'web',file),path.join(out,'assets',file));
  await fs.mkdir(path.join(out,'assets/licenses'),{recursive:true});await fs.copyFile(path.join(root,'licenses/OpenAI-math-Apache-2.0.txt'),path.join(out,'assets/licenses/OpenAI-math-Apache-2.0.txt'));
  await fs.copyFile(path.join(root,'node_modules/katex/LICENSE'),path.join(out,'assets/katex/LICENSE'));
  await fs.copyFile(path.join(root,'node_modules/katex/dist/katex.min.css'),path.join(out,'assets/katex/katex.min.css'));await fs.cp(path.join(root,'node_modules/katex/dist/fonts'),path.join(out,'assets/katex/fonts'),{recursive:true});
  for(const note of notes){const dir=['index','home'].includes(note.id)?out:path.join(out,note.id);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'index.html'),layout(note,rendered.get(note.id),notes,map,base,config));}
  await fs.writeFile(path.join(out,'search.json'),JSON.stringify(notes.map(n=>({id:n.id,title:n.title,group:n.group||'',url:noteUrl(n,base),text:n.body.replace(/[`#*_\[\]]/g,'').slice(0,30000)}))));
  await fs.writeFile(path.join(out,'graph.json'),JSON.stringify({nodes:notes.filter(isProofNode).map(n=>({id:n.id,label:n.source_label,title:n.title,group:n.group,url:noteUrl(n,base)})),edges:notes.flatMap(n=>n.depends_on.map(id=>({from:id,to:n.id,role:'dependency'}))),supportingDependencies:notes.flatMap(n=>n.supporting_dependencies.map(id=>({from:id,to:n.id,role:'supporting'}))),implementationOptions:notes.flatMap(n=>n.implementation_options.map(id=>({from:id,to:n.id,role:'implementation-option'})))}));
  await fs.writeFile(path.join(out,'build-info.json'),JSON.stringify({basePath:base,pages:notes.length,proofNodes:notes.filter(isProofNode).length,dependencyEdges:notes.reduce((n,p)=>n+p.depends_on.length,0),commit:process.env.GITHUB_SHA||'local'},null,2));
  await fs.writeFile(path.join(out,'.nojekyll'),'');await fs.writeFile(path.join(out,'404.html'),`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>页面未找到</title><h1>页面未找到</h1><p>笔记可能已更名。<a href="${base}">返回证明图谱并搜索</a></p></html>`);
  return {output:out,basePath:base,pages:notes.length,proofNodes:notes.filter(isProofNode).length,dependencyEdges:notes.reduce((n,p)=>n+p.depends_on.length,0)};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){build().then(result=>console.log(JSON.stringify(result,null,2))).catch(e=>{console.error(e.message);process.exitCode=1;});}
