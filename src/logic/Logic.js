
const redis = require('../services/redis');
const logicErr = require('../utils/logicErr');

module.exports = class Logic {

  constructor() {
    this.logicErr = logicErr;
  }


  async cache(key, data, ttl = 600) {

    key = `_logic.${this.className}.cache.${key}`;

    if (typeof data != 'undefined') {
      await redis.set(key, JSON.stringify(data), 'EX', ttl);
    } else {
      data = await redis.get(key);
      data = JSON.parse(data);
    }

    return data;
  }


};