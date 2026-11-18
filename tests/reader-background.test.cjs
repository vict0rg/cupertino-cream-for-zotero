/* Regression tests for Zotero-native PDF/EPUB reader colors and custom themes.
 * No Zotero installation or network is required. */
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'Cupertino-Zotero/bootstrap.js'), 'utf8') +
  '\n' + fs.readFileSync(path.join(root, 'Cupertino-Zotero/reader-background.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'Cupertino-Zotero/style.css'), 'utf8');
assert(!/item-pane-sidenav\s*\{\s*max-width:\s*10px/.test(css));
assert(!/#menubar-items\s*\{[^}]*opacity:\s*0/s.test(css));

const registered = new Map();
const prefs = new Map([['reader.lightTheme', false], ['reader.darkTheme', false]]);
let themes = [];
const service = {
  AUTHOR_SHEET: 1, loadAndRegisterSheet(){}, sheetRegistered(){return true;},
  unregisterSheet(){}
};
const zotero = {
  version: '10.0.0',
  uiReadyPromise: Promise.resolve(),
  Reader: {
    _readers: [],
    registerEventListener(type, fn) { registered.set(type, fn); },
    unregisterEventListener(type, fn) { if (registered.get(type) === fn) registered.delete(type); }
  },
  Libraries: { userLibraryID: 1 },
  SyncedSettings: {
    get(){ return themes; },
    async set(_id, _name, value){ themes = value; }
  },
  Prefs: { get(key){return prefs.get(key);}, set(key,v){prefs.set(key,v);} },
  logError(error){throw error;}, debug(){}
};
const components = {
  classes: {'@mozilla.org/content/style-sheet-service;1': {getService(){return service;}}},
  interfaces: {nsIStyleSheetService:{}}
};
const services = {
  io:{newURI(x){return x;}},
  wm:{getEnumerator(){return {hasMoreElements(){return false;}};},addListener(){},removeListener(){}}
};
const context = vm.createContext({
  Zotero:zotero,Services:services,Components:components,console,Promise,Map,Set,Date
});
vm.runInContext(js, context);

function element(tag) {
  return {
    tag, children:[], attributes:{}, style:{cssText:''}, textContent:'', value:'', disabled:false,
    setAttribute(name,value){this.attributes[name]=value;},
    appendChild(child){child.parent=this;this.children.push(child);return child;},
    insertBefore(child, next){
      child.parent=this;
      const pos=this.children.indexOf(next);
      this.children.splice(pos<0?this.children.length:pos,0,child);
    },
    remove(){ if(this.parent) this.parent.children.splice(this.parent.children.indexOf(this),1); },
    addEventListener(type,handler){this['on'+type]=handler;},
    get selectedOptions(){return this.children.filter(child=>child.value===this.value);},
    focus(){},
    showModal(){this.attributes.open='';},
    close(){delete this.attributes.open;this.onclose?.();}
  };
}

async function main() {
  context.startup({id:'test-cupertino',rootURI:'resource://mock/',
    resourceURI:{spec:'resource://mock/'}}, 0);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(typeof registered.get('renderToolbar'),'function');

  // A clean profile gets the requested gray default and non-black text.
  assert.equal(prefs.get('reader.lightTheme'), 'customCupertinoGray');
  assert.equal(prefs.get('reader.darkTheme'), 'customCupertinoGray');
  assert(themes.some(t=>t.id==='customCupertinoGray' &&
    t.background==='#FAFAFA' && t.foreground==='#333338'));

  const doc = {createElement:element, getElementById(){return null;}, body:element('body')};
  const controls=[];
  registered.get('renderToolbar')({doc, append(item){controls.push(item);}});
  assert.equal(controls.length,1);
  const group=controls[0];
  assert.equal(group.children[0].textContent,'Reading Colors');
  const select=group.children[1];
  assert.deepEqual(select.children.map(x=>x.textContent), [
    'Original','Soft Gray','Soft Paper','Soft Cream','Soft Blue','Soft Sage',
    '+ Custom Colors…'
  ]);
  assert.equal(select.value, 'customCupertinoGray');

  // Existing preset selection works in both light and dark readers.
  select.value='customCupertinoPaper';
  await select.onchange();
  assert.equal(prefs.get('reader.lightTheme'),'customCupertinoPaper');
  assert.equal(prefs.get('reader.darkTheme'),'customCupertinoPaper');
  assert(themes.some(t=>t.id==='customCupertinoPaper' && t.background==='#FAFAF7'));

  // The visible + entry opens name, background and foreground form fields.
  select.value='__new__';
  await select.onchange();
  const dialog=doc.body.children[0];
  assert.equal(dialog.tag,'dialog');
  const inputs=dialog.children.filter(x=>x.tag==='label').map(x=>x.children[0].children[0]);
  assert.equal(inputs.length,3);
  inputs[0].value='My Custom Gray';
  inputs[1].value='#F8F8FA';
  inputs[2].value='#35353A';
  const actions=dialog.children.find(x=>x.tag==='div' &&
    x.children.some(y=>y.textContent==='Save Theme'));
  await actions.children[1].onclick();
  const created=themes.find(x=>x.label==='My Custom Gray');
  assert(created && created.background==='#F8F8FA' && created.foreground==='#35353A');
  assert.equal(prefs.get('reader.lightTheme'),created.id);
  assert.equal(prefs.get('reader.darkTheme'),created.id);
  assert.equal(select.value,created.id);
  assert.equal(doc.body.children.length,0, 'Dialog closes after saving');

  const API=context.CupertinoReaderBackground;
  assert.equal(API.normalizeHex('fdfdff'),'#FDFDFF');
  assert.throws(()=>API.normalizeHex('#not-a-color'),/six-digit color/);
  await assert.rejects(()=>API.saveCustomTheme('My Custom Gray','#000000','#333338'),/already exists/);
  await assert.rejects(()=>API.saveCustomTheme('Bad','#ABC','#333338'),/six-digit color/);

  // Never change an existing custom theme when migrating an earlier default.
  themes=[{id:'my-existing',label:'Personal',background:'#EFEFFF',foreground:'#3A3A40'}];
  prefs.set('reader.lightTheme','my-existing');
  prefs.set('reader.darkTheme','my-existing');
  prefs.set('extensions.cupertinoSoft.defaultGrayV060',false);
  await API.initializeReaderTheme();
  assert.equal(prefs.get('reader.lightTheme'),'my-existing');
  assert.equal(themes[0].background,'#EFEFFF');

  // Only the untouched old Soft Paper default moves automatically to Soft Gray.
  themes=[{id:'customCupertinoPaper',label:'Soft Paper',
    background:'#FAFAF7',foreground:'#252B30'}];
  prefs.set('reader.lightTheme','customCupertinoPaper');
  prefs.set('reader.darkTheme','customCupertinoPaper');
  prefs.set('extensions.cupertinoSoft.defaultGrayV060',false);
  await API.initializeReaderTheme();
  assert.equal(prefs.get('reader.lightTheme'),'customCupertinoGray');
  assert(themes.some(x=>x.id==='customCupertinoPaper'), 'Keep the old preset available');

  themes=[{id:'customCupertinoCream',label:'Soft Cream',
    background:'#F7F1E5',foreground:'#252B30'}];
  assert.equal(await API.migrateLegacyCream(),true);
  assert.equal(themes[0].background,'#FFF9EC');
  themes=[{id:'customCupertinoCream',label:'Soft Cream',
    background:'#F0EEE0',foreground:'#222222'}];
  assert.equal(await API.migrateLegacyCream(),false);
  assert.equal(themes[0].background,'#F0EEE0');

  context.shutdown({id:'test-cupertino',rootURI:'resource://mock/',
    resourceURI:{spec:'resource://mock/'}},0);
  assert.equal(registered.size,0);
  console.log('Native PDF/EPUB colors, custom theme dialog, migration and lifecycle: PASS');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
