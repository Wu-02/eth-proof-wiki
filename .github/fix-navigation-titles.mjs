// Keep exported navigation labels consistent with the visible Markdown H1.
// Preserve the original note filenames, URLs, and Obsidian wikilinks.
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] ?? 'vault');
const output = path.resolve(process.argv[3] ?? '/output');

const headings = {};
const previousTitles = {};
for (const filename of fs.readdirSync(vault).filter(name => name.endsWith('.md'))) {
  const markdown = fs.readFileSync(path.join(vault, filename), 'utf8');
  const heading = markdown.match(/^# (.+)$/m)?.[1]?.trim();
  if (!heading) throw new Error(`Missing H1: ${filename}`);
  const id = path.basename(filename, '.md');
  headings[id] = heading;
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const title = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  previousTitles[id] = title ?? id;
}

const client = `<script data-proof-wiki-navigation-titles>
(() => {
  const titles = ${JSON.stringify(headings)};
  const oldTitles = ${JSON.stringify(previousTitles)};
  const update = () => {
    for (const link of document.querySelectorAll('a[href]')) {
      // Only change file-tree navigation, not article cross-references or the TOC.
      if (!link.closest('nav, aside, .tree-item, .file-tree, #file-tree, .nav-files-container, .file-explorer')) continue;
      let url;
      try { url = new URL(link.getAttribute('href'), document.baseURI); } catch { continue; }
      if (url.origin !== location.origin || !url.pathname.endsWith('.html')) continue;
      const id = decodeURIComponent(url.pathname.split('/').pop().slice(0, -5));
      if (!Object.prototype.hasOwnProperty.call(titles, id)) continue;
      const label = link.querySelector('.tree-item-inner, .nav-file-title-content, .tree-item-title') ?? link;
      if ([id, oldTitles[id]].includes(label.textContent.trim())) {
        label.textContent = titles[id];
        link.setAttribute('title', titles[id]);
      }
    }
  };
  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; update(); });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>`;

// The exporter also emits HTML fragments under site-lib/html. Those are not
// documents and intentionally have no <body>. Only root-level exported notes
// should receive the navigation script.
let count = 0;
for (const id of Object.keys(headings)) {
  const target = path.join(output, id + '.html');
  if (!fs.existsSync(target)) throw new Error(`Export missing note: ${id}.html`);
  let html = fs.readFileSync(target, 'utf8');
  if (html.includes('data-proof-wiki-navigation-titles')) continue;
  if (!/<\\/body\\s*>/i.test(html)) throw new Error(`Missing closing body in note: ${target}`);
  html = html.replace(/<\\/body\\s*>/i, `${client}</body>`);
  fs.writeFileSync(target, html);
  count++;
}
if (!count) throw new Error('No HTML files updated');
for (const id of Object.keys(headings)) {
  if (!fs.existsSync(path.join(output, id + '.html'))) {
    throw new Error(`Export missing note: ${id}.html`);
  }
}
console.log(`Navigation titles aligned: ${Object.keys(headings).length} notes, ${count} HTML files`);
