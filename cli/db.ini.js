'use strict';

const fs = require('fs');
const path = require('path');

const fileNameArray = fs.readdirSync(path.join(__dirname, '../src/models/'));

(async () => {
  for (let i = 0; i < fileNameArray.length; i++) {
    if (fileNameArray[i].indexOf('.js') === -1 ) continue;

    const model = require(`../src/models/${fileNameArray[i]}`);
    await model.create();
  }
})();
