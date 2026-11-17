const fs = require('node:fs');
const assert = require('node:assert/strict');
const css = fs.readFileSync('Cupertino-Zotero/style.css','utf8');
const manifest = JSON.parse(fs.readFileSync('Cupertino-Zotero/manifest.json','utf8'));
assert.equal(manifest.version, '0.4.1');
assert.equal(manifest.applications.zotero.id, 'cupertino-with-pdf-background@vict0rg.github.io');
// Navigation must be a real flex sibling, not an overlay.
assert.match(css, /item-pane#zotero-item-pane:not\(\.stacked\):not\(\[collapsed\]\)/);
assert.match(css, /#zotero-item-pane-content\s*\{[^}]*flex:\s*1 1 0 !important;[^}]*max-width:\s*calc\(100% - 40px\)/s);
assert.match(css, /#zotero-view-item-sidenav\s*\{[^}]*flex:\s*0 0 40px !important;[^}]*position:\s*relative !important;/s);
assert.match(css, /#zotero-context-pane-sidenav:not\(\.stacked\):not\(\[hidden\]\)/);
assert.match(css, /#zotero-items-tree \.row:not\(\.selected\):nth-child\(even\)/);
assert.match(css, /#zotero-items-tree \.row:not\(\.selected\):hover/);
assert.match(css, /#zotero-items-tree \.row:not\(\.selected\):nth-child\(odd\)/);
assert.match(css, /#zotero-items-tree \.row\.selected/);
assert.ok(!css.includes('#menubar-items {\n\tmax-width: 14px'));
console.log('Zotero layout flex reservation, zebra rows and ID stability: PASS');
