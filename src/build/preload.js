const fs = require('fs-extra');
const path = require('path');

if (fs.existsSync(path.resolve('./dist'))) {
  fs.emptyDirSync('./dist');
}
