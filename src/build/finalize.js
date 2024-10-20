const fs = require('fs-extra');
const path = require('path');

if (!fs.existsSync(path.resolve('./dist/plugin'))) {
  fs.mkdirSync('./dist/plugin');
} else {
  fs.emptyDirSync('./dist/plugin');
}

fs.copyFileSync('./src/manifest.json', './dist/plugin/manifest.json');
fs.copyFileSync('./dist/main.mjs', './dist/plugin/renderer.js');
