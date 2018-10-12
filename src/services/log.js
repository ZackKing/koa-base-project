const pino = require('pino');
const config = require('../config');

const log = pino();
log.level = config.log.level;

module.exports = log;