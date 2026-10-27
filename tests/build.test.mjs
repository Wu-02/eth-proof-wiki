import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNote,validateNotes,renderer,normalizeBase,noteUrl,targetId} from '../scripts/build.mjs';
const make=(id,body='',extra='')=>parseNote(`---\nid: ${id}\ntitle: "${id} 中文标题"\npublish: true\n${extra}\n---\n${body}`,id+'.md');
test('publication is explicit and requires stable ids',()=>{assert.equal(parseNote('---\ntitle: Private\n---\nsecret','x.md'),null);assert.equal(parseNote('no header','x.md'),null);assert.throws(()=>make('../oops'));assert.throws(()=>parseNote('---\nid: x\ntitle: X\npublish: true\n---\n','y.md'));assert.equal(make('D.1').id,'D.1');});
test('base paths are project-safe',()=>{assert.equal(normalizeBase('/eth-proof-wiki/'),'/eth-proof-wiki/');assert.equal(normalizeBase('/'),'/');for(const invalid of ['x','//evil/','/../','/x','/x?'])assert.throws(()=>normalizeBase(invalid));assert.equal(noteUrl({id:'D.1'},'/wiki/'),'/wiki/D.1/');assert.equal(noteUrl({id:'index'},'/wiki/'),'/wiki/');});
test('wikilink dependency ids normalize without losing source numbering',()=>{assert.equal(targetId('[[D.1|节点]]'),'D.1');assert.equal(targetId('4.1.md'),'4.1');});
test('missing dependencies and cycles fail the build',()=>{assert.throws(()=>validateNotes([make('a','','depends_on: [b]')]));assert.throws(()=>validateNotes([make('a','','depends_on: [b]'),make('b','','depends_on: [a]')]));assert.throws(()=>validateNotes([make('a','','depends_on: [a]')]));});
test('wikilinks generate correct project URLs and backlinks',()=>{const a=make('a','[[D.1|定理]]'),b=make('D.1');const map=validateNotes([a,b]);const html=renderer(map,'/wiki/',a).render(a.body);assert.match(html,/href="\/wiki\/D\.1\/"/);assert.match(html,/定理/);assert.ok(a.links.has('D.1'));});
test('broken and private wikilinks fail while literal code is untouched',()=>{const a=make('a');const md=renderer(validateNotes([a]),'/',a);assert.throws(()=>md.render('[[secret]]'));assert.match(md.render('`[[secret]]`'),/<code>\[\[secret\]\]<\/code>/);assert.match(md.render('```\n[[secret]]\n```'),/\[\[secret\]\]/);});
test('math is prerendered and never remotely fetched',()=>{const a=make('a'),md=renderer(validateNotes([a]),'/',a);const html=md.render('$x^2$\n\n$$\nE^{\\mathrm{NP}}\\not\\subseteq\\operatorname{SIZE}(O(n))\n$$');assert.match(html,/class="katex"/);assert.match(html,/<math/);assert.doesNotMatch(html,/<script/);assert.match(md.render('`$literal$`'),/<code>\$literal\$<\/code>/);assert.throws(()=>md.render('$\\unknowncommand{x}$'));});
test('raw HTML is escaped and heading ids are stable and unique',()=>{const a=make('a'),md=renderer(validateNotes([a]),'/',a);const html=md.render('<script>alert(1)</script>\n\n## 证明思路\n\n## 证明思路');assert.doesNotMatch(html,/<script>/);assert.match(html,/id="证明思路"/);assert.match(html,/id="证明思路-2"/);});
test('standard Markdown links are rewritten and private targets rejected',()=>{const a=make('a'),b=make('B.1');const md=renderer(validateNotes([a,b]),'/wiki/',a);assert.match(md.render('[节点](B.1.md)'),/href="\/wiki\/B.1\/"/);assert.throws(()=>md.render('[private](private.md)'));});

test('reference diagram preserves all original nodes and maps links into project base',async()=>{
  const fs=await import('node:fs/promises');const {sourceDiagram,ROOT}=await import('../scripts/build.mjs');
  const svg=await fs.readFile(ROOT+'/web/dependency-reference.svg','utf8');
  const ids=[...svg.matchAll(/<g id="node\d+" class="node">\s*<title>([^<]+)/g)].map(m=>m[1]);
  const map=new Map(ids.map(id=>[id,{id}]));const html=sourceDiagram(svg,map,'/wiki/');
  assert.equal(ids.length,33);assert.equal((html.match(/class="edge"/g)||[]).length,43);
  assert.equal((html.match(/target="_top"/g)||[]).length,33);assert.doesNotMatch(html,/xlink:href="https?:/);
  assert.match(html,/超线性电路下界/);assert.doesNotMatch(html,/非线性规模上界/);
  assert.throws(()=>sourceDiagram(svg,new Map(),'/wiki/'));
});

test('full builds exclude unpublished/private source and produce both base paths',async()=>{
  const fs=await import('node:fs/promises');const path=await import('node:path');const os=await import('node:os');const {build,ROOT}=await import('../scripts/build.mjs');
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'proof-wiki-test-'));
  try {
    await fs.mkdir(path.join(root,'vault/private'),{recursive:true});await fs.mkdir(path.join(root,'vault/.obsidian'),{recursive:true});await fs.mkdir(path.join(root,'web'));await fs.mkdir(path.join(root,'licenses'));await fs.copyFile(path.join(ROOT,'licenses/OpenAI-math-Apache-2.0.txt'),path.join(root,'licenses/OpenAI-math-Apache-2.0.txt'));
    await fs.symlink(path.join(ROOT,'node_modules'),path.join(root,'node_modules'),'dir');
    for(const file of ['style.css','app.js','icon.svg'])await fs.copyFile(path.join(ROOT,'web',file),path.join(root,'web',file));
    await fs.writeFile(path.join(root,'site.config.json'),JSON.stringify({title:'Test',basePath:'/wiki/'}));
    for(const id of ['index','reading-route','dependency-graph'])await fs.writeFile(path.join(root,'vault',id+'.md'),`---\nid: ${id}\ntitle: ${id}\npublish: true\n---\n\n# ${id}\n\n## 证明思路\n公开文本 [[reading-route]]`);
    await fs.writeFile(path.join(root,'vault/draft.md'),'---\ntitle: unpublished\n---\nDO-NOT-PUBLISH-1');
    await fs.writeFile(path.join(root,'vault/private/hidden.md'),'---\nid: hidden\ntitle: hidden\npublish: true\n---\nDO-NOT-PUBLISH-2');
    await fs.writeFile(path.join(root,'vault/.obsidian/workspace.json'),'DO-NOT-PUBLISH-3');
    await assert.rejects(build({root,output:'vault'}),/dedicated/);await fs.access(path.join(root,'vault/index.md'));
    const a=await build({root,basePath:'/wiki/'});assert.equal(a.pages,3);const search=await fs.readFile(path.join(root,'public/search.json'),'utf8');assert.doesNotMatch(search,/DO-NOT-PUBLISH/);
    assert.equal((await fs.readFile(path.join(root,'public/index.html'),'utf8')).match(/<h1[ >]/g).length,1);
    assert.match(await fs.readFile(path.join(root,'public/index.html'),'utf8'),/href="\/wiki\/reading-route\/"/);
    await assert.rejects(fs.access(path.join(root,'public/private')));await assert.rejects(fs.access(path.join(root,'public/.obsidian')));
    await build({root,basePath:'/',output:'public-root'});assert.match(await fs.readFile(path.join(root,'public-root/index.html'),'utf8'),/href="\/reading-route\/"/);
  } finally {await fs.rm(root,{recursive:true,force:true});}
});

test('section/topic source labels are not counted as numbered proof nodes',async()=>{const {isProofNode}=await import('../scripts/build.mjs');assert.ok(isProofNode({id:'D.1'}));assert.ok(isProofNode({id:'4.1'}));assert.equal(isProofNode({id:'route-a',source_label:'第3–6节'}),false);});
test('unsupported transclusion fails clearly rather than showing a fake embedding',()=>{const a=make('a'),md=renderer(validateNotes([a]),'/',a);assert.throws(()=>md.render('![[a#标题]]'),/transclusion/);assert.match(md.render('`![[a]]`'),/<code>!\[\[a\]\]<\/code>/);});

test('Obsidian block references preserve stable ids and anchor the preceding block',()=>{
  const a=make('a'),b=make('translation-2');const md=renderer(validateNotes([a,b]),'/wiki/',a);
  const html=md.render('$$x^2$$\n\n^eq-Foo\n\n[[translation-2#^eq-Foo|式（2.1）]]');
  assert.match(html,/id="eq-Foo"[\s\S]*class="math-display"/);
  assert.match(html,/href="\/wiki\/translation-2\/#eq-Foo"/);
  assert.doesNotMatch(html,/<p>\^eq-Foo/);
});
test('duplicate and orphan block anchors fail rather than produce ambiguous references',()=>{
  const a=make('a');const md=()=>renderer(validateNotes([a]),'/',a);
  assert.throws(()=>md().render('Text\n\n^same\n\nOther\n\n^same'),/Duplicate block id/);
  assert.throws(()=>md().render('^orphan'),/no preceding block/);
  assert.match(md().render('`^literal`'),/<code>\^literal<\/code>/);
});
