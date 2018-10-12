
const redis = require('ioredis');
const config = require('../config');

module.exports = new redis(config.redis);
