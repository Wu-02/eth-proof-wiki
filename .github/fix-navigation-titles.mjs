// Build-time normalization of the exported file tree, not browser-side DOM rewriting.
import fs from 'node:fs';
import path from 'node:path';

const vault = path.resolve(process.argv[2] ?? 'vault');
const output = path.resolve(process.argv[3] ?? '/output');
const tree = path.join(output, 'site-lib', 'html', 'file-tree-content.html');
if (!fs.existsSync(tree)) throw new Error('Exported file tree is missing: ' + tree);

const titles = new Map();
for (const name of fs.readdirSync(vault).filter(p => p.endsWith('.md'))) {
  const source = fs.readFileSync(path.join(vault, name), 'utf8');
  const heading = source.match(/^# (.+)$/m)?.[1]?.trim();
  if (!heading) throw new Error('Missing H1: ' + name);
  const id = path.basename(name, '.md');
  if (!fs.existsSync(path.join(output, id + '.html'))) throw new Error('Missing exported page: ' + id);
  titles.set(id, heading);
}

const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeRegex = s => s.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&');
let html = fs.readFileSync(tree, 'utf8');
const misses = [];
let changed = 0;
for (const [id, title] of titles) {
  // The exporter displays a note basename as a text node in its file tree.
  // Replace only text nodes exactly equal to the basename, never URLs or attributes.
  const pattern = new RegExp('(>\\s*)' + escapeRegex(id) + '(\\s*<)', 'g');
  let matches = 0;
  html = html.replace(pattern, (_, before, after) => {
    matches++;
    return before + escapeHtml(title) + after;
  });
  if (!matches && !html.includes(escapeHtml(title))) misses.push(id);
  changed += matches;
}
if (misses.length) throw new Error('File tree title nodes not found for: ' + misses.join(', '));
fs.writeFileSync(tree, html);
console.log('Normalized file tree titles for', titles.size, 'notes;', changed, 'labels replaced');
