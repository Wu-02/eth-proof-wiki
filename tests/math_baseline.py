"""Inline KaTeX baseline regression; uses an unpublished browser-only fixture.
Run after npm run build + npm run preview. Also called by browser-smoke.py.
"""
import json
import os
import subprocess
from playwright.sync_api import sync_playwright

FORMULAS = [r"(1-Y)^\ell", r"Y^\ell", r"(1+Y+Y^2+\cdots)^\ell", r"Y^j",
            r"j", r"\ell", r"\binom{\ell+j-1}{j}", r"x_i^2", r"\frac{x+1}{y}",
            r"\sum_{j=0}^{n}x_j"]


def check_math_baseline(browser, base):
    formulas = FORMULAS + [r"\overline{" + "x" * 180 + "}"]
    rendered = json.loads(subprocess.check_output(
        ["node", "--input-type=module", "-e",
         "import katex from 'katex'; console.log(JSON.stringify(JSON.parse(process.argv[1]).map((s,i,a)=>katex.renderToString(s,{throwOnError:true,displayMode:i===a.length-1}))));",
         json.dumps(formulas)], text=True))
    rows = "".join(f'<p class="sample"><span class="probe"></span>该有限和是 '
                   f'<span class="math-inline">{html}</span> 的逆。</p>' for html in rendered[:-1])
    markup = f'''<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="{base}assets/katex/katex.min.css">
<link rel="stylesheet" href="{base}assets/style.css">
<style>body{{padding:20px}}.prose{{font-size:14px;max-width:850px}}
.probe{{display:inline-block;width:0;height:0;vertical-align:baseline}}
.sample{{white-space:nowrap}}</style><article class="prose">{rows}
<div class="long math-display">{rendered[-1]}</div></article>'''
    measure = """() => [...document.querySelectorAll('.sample')].map(p=>{
      const probe=p.querySelector('.probe'), strut=p.querySelector('.katex-strut');
      const va=getComputedStyle(strut).verticalAlign;
      const mathBaseline=strut.getBoundingClientRect().bottom+(va==='baseline'?0:parseFloat(va));
      return mathBaseline-probe.getBoundingClientRect().top;
    })"""
    results = []
    for viewport in [{"width":1440,"height":1050}, {"width":390,"height":844}]:
        page = browser.new_page(viewport=viewport)
        page.set_content(markup, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        assert page.evaluate("document.fonts.check('15px KaTeX_Main')"), "KaTeX font missing"
        actual = page.evaluate(measure)
        assert max(map(abs, actual)) < 0.2, {"viewport":viewport,"baselineDeltas":actual}
        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth"), viewport
        # Display equations retain horizontal scrolling; inline math uses native layout.
        wide = page.locator('.long.math-display')
        assert wide.evaluate("e=>e.scrollWidth > e.clientWidth+10"), "Fixture must overflow"
        wide.evaluate("e=>{e.scrollLeft=120}")
        assert wide.evaluate("e=>e.scrollLeft") > 0, "Long display math cannot scroll"
        # Negative controls: hiding scrollbars alone and simply switching to baseline
        # must not make this test pass accidentally for the old inline-block wrapper.
        old = page.add_style_tag(content=".math-inline{display:inline-block;vertical-align:middle;max-width:100%;overflow:auto hidden;line-height:normal;scrollbar-width:auto;padding:1px 0}.math-inline::-webkit-scrollbar{display:block}")
        original = page.evaluate(measure)
        assert max(map(abs, original)) > 0.5, "Negative control did not expose old bug"
        hidden = page.add_style_tag(content=".math-inline{scrollbar-width:none;padding:1px 2px}.math-inline::-webkit-scrollbar{display:none}")
        hidden_only = page.evaluate(measure)
        assert max(map(abs, hidden_only)) > 0.5, "Hiding scrollbars is not the baseline fix"
        baseline = page.add_style_tag(content=".math-inline{vertical-align:baseline}")
        baseline_only = page.evaluate(measure)
        assert max(map(abs, baseline_only)) > 0.5, "Scrollable inline-block uses its bottom edge"
        results.append({"viewport":viewport,"fixedDeltas":actual,"oldDeltas":original,
                        "hiddenOnlyDeltas":hidden_only,"baselineOnlyDeltas":baseline_only})
        page.close()
    return results


if __name__ == "__main__":
    with sync_playwright() as p:
        args = ["--no-sandbox"] if os.environ.get("CI") or os.environ.get("BROWSER_NO_SANDBOX") else []
        browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"), headless=True, args=args)
        print(json.dumps(check_math_baseline(browser, os.environ.get("PREVIEW_URL", "http://127.0.0.1:4173/eth-proof-wiki/"))))
        browser.close()
