'use strict';

const redis = require('../services/redis.js');

const sessionHashName = 'session.info';

module.exports = {

  async get(key) {
    let info = await redis.hget(sessionHashName, key);
    return JSON.parse(info);
  },

  async set(key, value) {
    await redis.hset(sessionHashName, key, JSON.stringify(value));  
  },

  async destroy(key) {
    await redis.hdel(sessionHashName, key);
  }
  
};