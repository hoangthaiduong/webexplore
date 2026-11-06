const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
const storage = {
  webstore_data: JSON.stringify({ favorites: [], saved: [], history: [], collections: [{
    id: 'c1', name: 'My collection', ids: Array.from({ length: 45 }, (_, i) => `ws-${String(i + 1).padStart(4, '0')}`)
  }] }),
  ws_theme: 'light', ws_density: 'comfortable', ws_history: 'true', ws_sort: 'name'
};
class Element {
  constructor(id = '') {
    this.id = id; this.innerHTML = ''; this.value = ''; this.checked = false;
    this.dataset = {}; this.style = {}; this.handlers = {}; this.classNames = new Set();
    this.classList = {
      toggle: (name, force) => { const on = force === undefined ? !this.classNames.has(name) : force; on ? this.classNames.add(name) : this.classNames.delete(name); return on; },
      add: name => this.classNames.add(name), remove: name => this.classNames.delete(name),
      contains: name => this.classNames.has(name)
    };
  }
  addEventListener(name, fn) { this.handlers[name] = fn; }
  querySelectorAll() { return []; }
  querySelector() { return null; }
  append() {}
  focus() {}
  setSelectionRange() {}
  closest() { return this; }
  remove() {}
}
const elements = {};
for (const id of ['app', 'view', 'globalSearch', 'overlay', 'sidebar', 'suggestions']) elements[id] = new Element(id);
const document = {
  body: new Element('body'), documentElement: { style: {} },
  getElementById(id) { return elements[id] || (elements[id] = new Element(id)); },
  querySelectorAll() { return []; }, querySelector() { return null; },
  createElement(tag) { return new Element(tag); }, addEventListener() {}
};
const window = {
  WEBSITES: require(path.join(root, 'src/data/websites.json')),
  localStorage: {
    getItem: key => storage[key] ?? null,
    setItem: (key, value) => { storage[key] = value; },
    removeItem: key => { delete storage[key]; }
  },
  matchMedia: () => ({ matches: false, addEventListener() {} }),
  open() {}, scrollTo() {}
};
const context = { window, document, console, URL, Blob, FileReader: function () {},
  setTimeout: () => 0, clearTimeout() {}, Date, Math, JSON, Array, String, Object, Error };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'src/app.js'), 'utf8'), context);
assert(elements.view.innerHTML.includes('Discover your next'), 'homepage renders');
const click = ({ id = '', dataset = {} } = {}) => {
  const target = { id, dataset, closest() { return this; } };
  elements.app.handlers.click({ target, preventDefault() {} });
};
click({ dataset: { page: 'all' } });
assert(elements.view.innerHTML.includes('All websites'), 'directory navigation works');
assert((elements.view.innerHTML.match(/class="website-card"/g) || []).length === 36, 'first page renders 36 cards');
click({ id: 'loadMore' });
assert((elements.view.innerHTML.match(/class="website-card"/g) || []).length === 72, 'load more renders next page');
click({ dataset: { action: 'favorite', id: 'ws-0001' } });
assert(JSON.parse(storage.webstore_data).favorites.includes('ws-0001'), 'favorite persists');
click({ dataset: { action: 'compare', id: 'ws-0001' } });
click({ dataset: { page: 'compare' } });
assert(elements.view.innerHTML.includes('Compare websites'), 'comparison page renders');
click({ dataset: { page: 'collections' } });
click({ dataset: { action: 'collection-open', id: 'c1' } });
assert(elements.view.innerHTML.includes('My collection'), 'collection opens');
assert((elements.view.innerHTML.match(/class="website-card"/g) || []).length === 36, 'collection first page renders');
click({ id: 'loadMore' });
assert((elements.view.innerHTML.match(/class="website-card"/g) || []).length === 45, 'collection pagination works');
click({ dataset: { page: 'settings' } });
assert(elements.view.innerHTML.includes('themeSelect'), 'settings page renders');
const themeSelect = { id: 'themeSelect', value: 'dark' };
elements.app.handlers.change({ target: themeSelect });
assert(storage.ws_theme === 'dark', 'dark theme preference persists');
assert(document.documentElement.style.colorScheme === 'dark', 'dark color scheme is applied');
console.log('PASS: homepage, navigation, directory rendering, pagination, favorites, comparison, collections, settings and dark theme.');
