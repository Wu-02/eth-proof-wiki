import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const vault = fileURLToPath(new URL('../vault/', import.meta.url));
const readProperty = (frontmatter, key) => {
  const row = frontmatter.split(/\r?\n/).find(line => line.startsWith(key + ':'));
  if (!row) return undefined;
  const value = row.slice(key.length + 1).trim();
  return value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
};

test('every note has a stable id and a navigation title matching its H1', () => {
  const notes = fs.readdirSync(vault).filter(filename => filename.endsWith('.md'));
  assert.ok(notes.length > 0, 'no Markdown notes found');
  for (const filename of notes) {
    const text = fs.readFileSync(path.join(vault, filename), 'utf8');
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    assert.ok(frontmatter, filename + ': missing YAML frontmatter');
    const id = readProperty(frontmatter, 'id');
    const title = readProperty(frontmatter, 'title');
    const h1 = text.match(/^# (.+)$/m)?.[1]?.trim();
    assert.equal(id, path.basename(filename, '.md'), filename + ': id must match filename');
    assert.ok(h1, filename + ': missing top-level heading');
    assert.equal(title, h1, filename + ': navigation title differs from H1');
  }
});
