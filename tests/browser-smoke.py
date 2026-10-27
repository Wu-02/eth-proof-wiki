"""Optional local-browser regression checks. Start npm run preview first.
Requires Python Playwright and a Chromium executable; screenshots stay in .qa/.
"""
import json
import os
import shutil
from pathlib import Path
from urllib.request import urlopen
from playwright.sync_api import sync_playwright
from math_baseline import check_math_baseline

BASE = os.environ.get("PREVIEW_URL", "http://127.0.0.1:4173/eth-proof-wiki/")
OUT = Path(".qa")
OUT.mkdir(exist_ok=True)
errors, failed = [], []
notes = json.load(urlopen(BASE + "search.json"))
translations = [n for n in notes if n["id"].startswith("translation-")]
with sync_playwright() as p:
    args = ["--no-sandbox"] if os.environ.get("CI") or os.environ.get("BROWSER_NO_SANDBOX") else []
    browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH") or shutil.which("chromium"), headless=True, args=args)
    baseline_results = check_math_baseline(browser, BASE)
    page = browser.new_page(viewport={"width": 1440, "height": 1050}, device_scale_factor=1)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("requestfailed", lambda r: failed.append(r.url))
    for note in notes:
        url = BASE + ("" if note["id"] in ["index", "home"] else note["id"] + "/")
        response = page.goto(url, wait_until="load")
        page.evaluate("document.fonts.ready")
        assert response.status == 200, url
        assert page.locator("h1").count() == 1, url
        assert page.locator("#sidebar .topic-nav").count() == 5, url
        assert page.locator("#sidebar .translation-nav").count() == len(translations), url
        if note["id"].startswith("translation-"):
            assert page.locator(".katex").count() > 0, url
            assert page.locator(".block-anchor").count() > 0, url
        assert page.locator(".katex-error").count() == 0, url
        assert not page.evaluate("document.documentElement.scrollWidth > window.innerWidth"), url
    page.goto(BASE, wait_until="networkidle")
    page.screenshot(path=str(OUT / "desktop-home.png"), full_page=True)
    page.goto(BASE + "D.1/", wait_until="networkidle")
    assert page.locator(".katex").count() > 0
    page.screenshot(path=str(OUT / "desktop-proof.png"), full_page=True)
    # Repeated opening, search revisions, closing, and keyboard shortcut.
    page.get_by_role("button", name="搜索笔记").click()
    page.locator("#search-input").fill("D.1")
    page.wait_for_function("document.querySelector('#search-results').children.length > 0")
    assert "D.1" in page.locator("#search-results a").first.inner_text()
    page.locator("#search-input").fill("not-a-real-proof-node-987654321")
    page.wait_for_function("document.querySelector('#search-status').textContent.includes('没有匹配')")
    page.keyboard.press("Escape")
    page.locator("#search-dialog").wait_for(state="hidden")
    assert not page.locator("#search-dialog").is_visible()
    page.keyboard.press("/")
    assert page.locator("#search-dialog").is_visible()
    page.get_by_role("button", name="关闭搜索").click()
    page.locator("#search-dialog").wait_for(state="hidden")
    assert not page.locator("#search-dialog").is_visible()
    page.goto(BASE + "dependency-graph/", wait_until="networkidle")
    assert page.locator(".diagram-scroll .node a").count() == 33
    page.locator("#graph-select").select_option("D.1")
    assert page.locator(".is-selected").count() == 1
    assert page.locator(".is-related").count() >= 4
    page.screenshot(path=str(OUT / "desktop-graph.png"), full_page=True)
    page.get_by_role("button", name="清除高亮").click()
    assert page.locator(".is-selected,.is-dimmed,.is-related").count() == 0
    page.locator('.diagram-scroll .node a[href$="D.1/"]').click()
    assert page.url.endswith("/D.1/")
    page.go_back(wait_until="load")
    assert page.url.endswith("/dependency-graph/")
    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.on("pageerror", lambda e: errors.append(str(e)))
    mobile.on("requestfailed", lambda r: failed.append(r.url))
    for suffix in ["" if n["id"] in ["index", "home"] else n["id"] + "/" for n in notes]:
        mobile.goto(BASE + suffix, wait_until="networkidle")
        mobile.evaluate("document.fonts.ready")
        assert not mobile.evaluate("document.documentElement.scrollWidth > window.innerWidth"), "mobile " + suffix
        assert not mobile.locator("#sidebar").is_visible()
    mobile.goto(BASE, wait_until="networkidle")
    mobile.screenshot(path=str(OUT / "mobile-home.png"), full_page=True)
    mobile.get_by_role("button", name="切换导航").click()
    assert mobile.locator("#sidebar").is_visible()
    mobile.keyboard.press("Escape")
    assert not mobile.locator("#sidebar").is_visible()
    mobile.get_by_role("button", name="切换导航").click()
    mobile.locator('#sidebar a[href$="D.1/"]').click()
    mobile.wait_for_url("**/D.1/")
    assert not mobile.locator("#sidebar").is_visible()
    mobile.screenshot(path=str(OUT / "mobile-proof.png"), full_page=True)
    if translations:
        page.goto(BASE, wait_until="networkidle")
        assert page.locator('.home .prose a[href*="/translation-"]').count() == len(translations)
        page.goto(BASE + "D.1/", wait_until="networkidle")
        links = page.locator('.prose a[href*="translation-D/"]')
        assert links.count() >= 2, "D.1 needs both statement and proof locations"
        links.first.click()
        page.wait_for_url("**/translation-D/**")
        anchor = page.evaluate("decodeURIComponent(location.hash).slice(1)")
        assert anchor and page.locator('[id="' + anchor + '"]').count() == 1
        page.screenshot(path=str(OUT / "desktop-translation.png"), full_page=False)
        mobile.goto(BASE + "translation-D/", wait_until="networkidle")
        mobile.screenshot(path=str(OUT / "mobile-translation.png"), full_page=False)
    assert errors == [], errors
    assert failed == [], failed
    browser.close()
print(json.dumps({"pages": len(notes), "desktop": "1440x1050", "mobile": "390x844", "pageErrors": errors, "failedRequests": failed, "baselineRegression": baseline_results, "status": "passed"}, ensure_ascii=False))
