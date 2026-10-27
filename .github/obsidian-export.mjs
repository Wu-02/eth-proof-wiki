// Invocation glue only. Rendering is performed by the installed Obsidian app
// and upstream Webpage HTML Export, not by a local Markdown renderer.
(async () => {
  const fs = require('node:fs');
  const crypto = require('node:crypto');
  try {
    await new Promise(resolve => app.workspace.onLayoutReady(resolve));
    await app.plugins.setEnable(true);
    await app.plugins.enablePlugin('webpage-html-export');
    const plugin = app.plugins.getPlugin('webpage-html-export');
    if (!plugin || typeof plugin.exportVault !== 'function') throw new Error('Native export plugin not loaded');
    const files = app.vault.getMarkdownFiles();
    if (!files.length) throw new Error('Empty export vault');
    const sourceHashes = {};
    for (const file of files) {
      sourceHashes[file.path] = crypto.createHash('sha256').update(await app.vault.read(file)).digest('hex');
    }
    console.log('OBSIDIAN_NATIVE_EXPORT_START', JSON.stringify({pages:files.length,plugin:plugin.manifest.version,electron:process.versions.electron}));
    await plugin.exportVault('/output');
    for (const file of files) {
      const html = '/output/' + file.path.replace(/\.md$/i,'.html');
      if (!fs.existsSync(html) || fs.statSync(html).size < 1000) throw new Error('Missing/empty exported note: '+file.path);
    }
    fs.writeFileSync('/output/obsidian-export.json',JSON.stringify({commit:process.env.GITHUB_SHA,obsidianVersion:'1.9.12',pluginId:plugin.manifest.id,pluginVersion:plugin.manifest.version,pluginCommit:process.env.EXPORTER_COMMIT,method:'Obsidian application -> Webpage HTML Export.exportVault',sourceHashes},null,2));
    console.log('OBSIDIAN_NATIVE_EXPORT_COMPLETE',files.length);
  } catch (error) {
    console.error('OBSIDIAN_NATIVE_EXPORT_FAILED',error?.stack || String(error));
  } finally {
    require('node:process').kill(process.pid,'SIGKILL');
  }
})();
