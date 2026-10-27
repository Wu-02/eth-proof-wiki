"""Validate upstream Obsidian exports; this file does not render Markdown."""
import hashlib, json, os, re, time
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import urlopen
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4173/eth-proof-wiki/'
OUT = Path(os.environ['EXPORT_DIR'])
manifest = json.loads((OUT / 'obsidian-export.json').read_text())
sources = {p.name: p.read_text() for p in Path('vault').glob('*.md')}
assert len(manifest['sourceHashes']) == len(sources)
assert manifest['commit'] == os.environ['GITHUB_SHA']
for name, source in sources.items():
    assert hashlib.sha256(source.encode()).hexdigest() == manifest['sourceHashes'][name], name
    assert not name.startswith('translation-')
    assert name not in {'1.2.md','1.3.md','1.4.md','C.1.md','C.2.md','witness-recovery-sampling.md'}
    assert (OUT / name.replace('.md','.html')).is_file(), name
for p in OUT.rglob('*'):
    assert p.suffix not in {'.md','.tex','.pdf','.log','.yml','.yaml'}, str(p)
    assert not any(x in {'.obsidian','.git','.qa','private','raw'} for x in p.relative_to(OUT).parts), str(p)
for _ in range(30):
    try:
        urlopen(BASE, timeout=1).close()
        break
    except Exception:
        time.sleep(1)
else:
    raise AssertionError('Preview server unavailable')

qa=Path('.qa');qa.mkdir(exist_ok=True)
links=set();math_count=0;notes_checked=[];issues=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1050})
    for name,source in sources.items():
        url=BASE+name.replace('.md','.html')
        response=page.goto(url,wait_until='load')
        assert response.status==200,url
        page.evaluate('document.fonts.ready')
        assert page.locator('.markdown-preview-view,.markdown-rendered').count()>0,url
        assert page.locator('mjx-merror,[data-mjx-error],[data-mml-node="merror"]').count()==0,url
        math_count += page.locator('mjx-container').count()
        body=re.sub(r'^---\n[\s\S]*?\n---\n','',source)
        # Check prose throughout each source, including long proof endings.
        chinese=set(re.findall(r'[\u4e00-\u9fff]{8,}',body))
        text=page.locator('body').text_content()
        missing=[s for s in chinese if s not in text]
        assert not missing,(name,missing[:8])
        for href in page.locator('a[href]').evaluate_all('es=>es.map(e=>e.href)'):
            if href.startswith('http://127.0.0.1:4173/'):
                links.add(href)
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth+2'),url
        notes_checked.append(name)
    assert math_count>0,'No native MathJax output'
    for href in sorted(links):
        parsed=urlsplit(href)
        assert parsed.path.startswith('/eth-proof-wiki/'),('outside project base',href)
        relative=unquote(parsed.path[len('/eth-proof-wiki/'):]) or 'index.html'
        target=OUT/relative
        if target.is_dir():target=target/'index.html'
        assert target.is_file(),('missing file',href)
        if parsed.fragment and target.suffix=='.html':
            html=target.read_text()
            anchor=unquote(parsed.fragment)
            # Obsidian block references use ^block-id; preserve native IDs.
            candidates={anchor,anchor.lstrip('^')}
            assert any(f'id="{a}"' in html or f"id='{a}'" in html or f'data-block-id="{a}"' in html for a in candidates),('missing anchor',href)
    page.goto(BASE+'A.1.html',wait_until='networkidle')
    assert '本页对一个 CNF 公式构造两个子公式' in page.locator('body').inner_text()
    assert page.locator('a[href*="translation-"]').count()==0
    page.screenshot(path=str(qa/'obsidian-a1-desktop.png'),full_page=True)
    page.goto(BASE,wait_until='networkidle')
    page.screenshot(path=str(qa/'obsidian-home-desktop.png'),full_page=True)
    mobile=browser.new_page(viewport={'width':390,'height':844})
    for name in sources:
        mobile.goto(BASE+name.replace('.md','.html'),wait_until='load')
        assert not mobile.evaluate('document.documentElement.scrollWidth > innerWidth+2'),('mobile overflow',name)
    mobile.goto(BASE+'A.1.html',wait_until='networkidle')
    mobile.screenshot(path=str(qa/'obsidian-a1-mobile.png'),full_page=True)
    browser.close()
print(json.dumps({'status':'passed','nativeExport':manifest['method'],'pages':len(notes_checked),'mathJaxContainers':math_count,'internalLinks':len(links),'sourceHashesVerified':len(sources),'desktop':'1440x1050','mobile':'390x844'},ensure_ascii=False))
