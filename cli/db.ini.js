
const fs = require('fs');
const path = require('path');

const fileNameArray = fs.readdirSync(path.join(__dirname, '../src/models/'));

(async () => {
  for (let i = 0; i < fileNameArray.length; i++) {
    if (fileNameArray[i].indexOf('.js') === -1 || fileNameArray[i] === 'Model.js' ) continue;

    const M = require(`../src/models/${fileNameArray[i]}`);
    const m = new M();
    await m.init();
  }
  console.log('finish !');
  process.exit(0);
})();
