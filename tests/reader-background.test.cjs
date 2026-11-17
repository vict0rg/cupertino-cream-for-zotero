/* Test the packaged reader module in a simulated Zotero plugin environment.
 * No DOM, Zotero installation, or network needed. */
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'Cupertino-Zotero/bootstrap.js'), 'utf8') +
  '\n' + fs.readFileSync(path.join(root, 'Cupertino-Zotero/reader-background.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'Cupertino-Zotero/style.css'), 'utf8');
assert(!/item-pane-sidenav\s*\{\s*max-width:\s*10px/.test(css), 'Native sidebar width must not be collapsed');
assert(!/#menubar-items\s*\{[^}]*opacity:\s*0/s.test(css), 'Application menu must stay visible');

const registered = new Map();
const prefs = new Map([['reader.lightTheme', false], ['reader.darkTheme', false]]);
let themes = [];
const service = {AUTHOR_SHEET: 1, loadAndRegisterSheet(){}, sheetRegistered(){return true;}, unregisterSheet(){}};
const zotero = {
  uiReadyPromise: Promise.resolve(),
  Reader: {
    _readers: [],
    registerEventListener(type, fn) { registered.set(type, fn); },
    unregisterEventListener(type, fn) { if(registered.get(type) === fn) registered.delete(type); }
  },
  Libraries: {userLibraryID: 1},
  SyncedSettings: {get(){return themes;}, async set(_id,_name,val){ themes=val; }},
  Prefs: {get(key){return prefs.get(key);}, set(key,v){prefs.set(key,v);}},
  logError(error){throw error;}, debug(){}
};
const components = {classes: {'@mozilla.org/content/style-sheet-service;1': {getService(){return service;}}}, interfaces:{nsIStyleSheetService:{}}};
const services = {io:{newURI(x){return x;}},wm:{getEnumerator(){return {hasMoreElements(){return false;}};},addListener(){},removeListener(){}}};
const context = vm.createContext({Zotero:zotero,Services:services,Components:components,console,Promise,Map,Set,Date});
vm.runInContext(js,context);
async function main() {
  context.startup({id:'test-cupertino',rootURI:'resource://mock/',resourceURI:{spec:'resource://mock/'}}, 0);
  await Promise.resolve(); await Promise.resolve();
  assert.equal(typeof registered.get('renderToolbar'),'function','Reader toolbar hook must register');
  const controls=[];
  function element(tag) {
    return {
      tag, children:[],attributes:{}, style:{cssText:''}, textContent:'', value:'', disabled:false,
      setAttribute(name,value){this.attributes[name]=value;},
      appendChild(child){this.children.push(child);},
      addEventListener(type,handler){this['on'+type]=handler;},
      get selectedOptions(){return this.children.filter(x=>x.value===this.value);}
    };
  }
  const doc={createElement:element, getElementById(){return null;}};
  registered.get('renderToolbar')({doc,append(item){controls.push(item);}});
  assert.equal(controls.length,1);
  const group=controls[0];
  assert(group.children[0].textContent==='PDF Background');
  const select=group.children[1];
  assert.deepEqual(select.children.map(x=>x.textContent),
    ['Original','Soft Cream','Soft Blue','Soft Sage','Soft Paper']);
  select.value='customCupertinoCream';
  await select.onchange();
  assert.equal(prefs.get('reader.lightTheme'),'customCupertinoCream');
  assert.equal(prefs.get('reader.darkTheme'),'customCupertinoCream');
  assert(themes.some(x=>x.id==='customCupertinoCream' && x.background==='#FFF9EC'));
  // Migrate old default values only; user-edited theme colors are untouched.
  themes = [{id:'customCupertinoCream',label:'Soft Cream',background:'#F7F1E5',foreground:'#252B30'}];
  assert.equal(await context.CupertinoReaderBackground.migrateLegacyCream(), true);
  assert.equal(themes[0].background,'#FFF9EC');
  themes = [{id:'customCupertinoCream',label:'Soft Cream',background:'#F0EEE0',foreground:'#222222'}];
  assert.equal(await context.CupertinoReaderBackground.migrateLegacyCream(), false);
  assert.equal(themes[0].background,'#F0EEE0');
  context.shutdown({id:'test-cupertino',rootURI:'resource://mock/',resourceURI:{spec:'resource://mock/'}}, 0);
  assert.equal(registered.size,0,'Hook must unregister on shutdown');
  console.log('Reader module registration, toolbar, theme preferences and metadata rail assertions passed');
}
main().catch(error=>{console.error(error); process.exitCode=1;});
