
const env = process.env.NODE_ENV || 'development';

console.log('use', env, 'config file');

const config = require(`./${env}.js`);
config.err = require('./err.js');
config.doc = require('./doc.js');

module.exports = config;