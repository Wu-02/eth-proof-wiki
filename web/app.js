(() => {
  const dialog = document.querySelector('#search-dialog');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  const status = document.querySelector('#search-status');
  let indexPromise;
  let request = 0;
  async function loadIndex() {
    if (!indexPromise) indexPromise = fetch(document.body.dataset.base + 'search.json').then(r => {if (!r.ok) throw new Error('Search unavailable');return r.json();}).catch(e=>{indexPromise=undefined;throw e;});
    return indexPromise;
  }
  async function search() {
    const thisRequest=++request, query=input.value.trim().toLocaleLowerCase(), terms=query.split(/\s+/).filter(Boolean);
    results.replaceChildren();
    if (!query) { status.textContent='输入中文、术语或节点编号开始搜索。';return; }
    status.textContent='正在搜索…';
    try {
      const notes=await loadIndex();if(thisRequest!==request)return;
      const matches=notes.map(n=>({...n,score:terms.reduce((score,t)=>score+(n.title.toLowerCase().includes(t)?6:0)+(n.id.toLowerCase()===t?15:0)+(n.text.toLowerCase().includes(t)?1:0),0)})).filter(n=>terms.every(t=>(n.id+' '+n.title+' '+n.text).toLowerCase().includes(t))).sort((a,b)=>b.score-a.score).slice(0,35);
      status.textContent=matches.length?`找到 ${matches.length}${matches.length===35?' 条以内的匹配':''} 条笔记`:'没有匹配的笔记，试试定理编号或更短关键词。';
      for(const note of matches){const li=document.createElement('li'),a=document.createElement('a'),strong=document.createElement('strong'),span=document.createElement('span');a.href=note.url;strong.textContent=note.title;span.textContent=note.group+' · '+note.id;a.append(strong,span);li.append(a);results.append(li);}
    } catch(e) { if(thisRequest===request)status.textContent='搜索索引未加载。请检查网络后重新输入，或使用左侧节点索引。'; }
  }
  function openSearch(){if(dialog.open)return;dialog.showModal();input.focus();search();}
  document.querySelector('#search-open')?.addEventListener('click',openSearch);
  input?.addEventListener('input',search);
  document.addEventListener('keydown',e=>{if((e.key==='/'||((e.ctrlKey||e.metaKey)&&e.key==='k'))&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();openSearch();}});
  dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  const menu=document.querySelector('#menu-toggle');
  function closeMenu(){if(document.querySelector('#sidebar')?.contains(document.activeElement))menu?.focus();document.body.classList.remove('menu-open');menu?.setAttribute('aria-expanded','false');}
  menu?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));});
  document.querySelector('#main')?.addEventListener('click',closeMenu);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('pageshow',closeMenu);
  const select=document.querySelector('#graph-select');
  function highlight(){const id=select?.value;const nodes=[...document.querySelectorAll('.graph-node')],chosen=nodes.find(n=>n.dataset.node===id);const related=new Set(id?[id,...(chosen?.dataset.deps||'').split(' ')]:[]);nodes.filter(n=>n.dataset.deps.split(' ').includes(id)).forEach(n=>related.add(n.dataset.node));for(const node of nodes){node.classList.toggle('is-selected',!!id&&node.dataset.node===id);node.classList.toggle('is-related',!!id&&related.has(node.dataset.node));node.classList.toggle('is-dimmed',!!id&&!related.has(node.dataset.node));}}
  select?.addEventListener('change',highlight);
  document.querySelector('#graph-reset')?.addEventListener('click',()=>{select.value='';highlight();});
})();
