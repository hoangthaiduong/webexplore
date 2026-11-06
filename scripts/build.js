const fs = require('fs');
const path = require('path');
require('./validate.js');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const item of ['index.html', 'public', 'src']) {
  fs.cpSync(path.join(root, item), path.join(out, item), { recursive: true });
}
console.log('Production-ready static site copied to dist/.');
