
// production | development
const env = [process.env.NODE_ENV || 'development'];

console.log('use', env, 'config file');

const fs = require('fs');
const path = require('path');

const fileNameArray = fs.readdirSync(path.join(__dirname, `./${env}`));

let config = {};

for (let i = 0; i < fileNameArray.length; i++) {
  if (fileNameArray[i].indexOf('.js') === -1 || fileNameArray[i] === 'index.js' ) 
    continue;
  config[`${fileNameArray[i].replace('.js', '')}Config`] = require(`./${env}/${fileNameArray[i]}`);
}

module.exports = config;