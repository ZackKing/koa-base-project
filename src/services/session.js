
const jwt = require('jsonwebtoken');
const redis = require('./redis');
const config = require('../config');

class Session {


  async get(uid) {
    let v = await redis.get(`${config.session.prefix}.user.${uid}`);
    return JSON.parse(v);
  }


  async set(uid, data) {
    return await redis.set(`${config.session.prefix}.user.${uid}`, JSON.stringify(data), 'EX', config.session.ttl);
  }


  async del(uid) {
    return await redis.del(`${config.session.prefix}.user.${uid}`);
  }


  //Returns the decoded payload without verifying if the signature is valid.
  decode(token) { 
    return jwt.decode(token, config.jwt.secret);
  }


  verify(token) {
    return jwt.verify(token, config.jwt.secret);
  }


  sign(obj) {
    return jwt.sign(obj, config.jwt.secret, config.jwt.option);
  }


}

module.exports = new Session();