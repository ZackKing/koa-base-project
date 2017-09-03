'use strict';

const redis = require('ioredis');
const { redisConfig } = require('../config');

module.exports = new redis(redisConfig);
