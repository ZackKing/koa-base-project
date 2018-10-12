
const Logic = require('./Logic');
const C = require('../utils/common');
const log = require('../services/log');
const UserMdl = require('../models/User');
const userMdl = new UserMdl();


module.exports = class User extends Logic {

  constructor() {
    super();
    this.className = 'User';
  }

  async getByAccount(account) {
    return await userMdl.model.findOne({ where: { account } });
  }



};