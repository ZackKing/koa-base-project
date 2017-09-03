'use strict';

const logger = require('pino')();
const account = require('../models/account.js');

module.exports = class accountLogic {

  constructor() {
    this.className = 'accountLogic';
  }

  async getAllAccount() {
    return await account.model.findAll();
  }

  async testError() {
    logger.info('logic error before');
    throw new Error('logic error');
    logger.info('logic error after');
  }

};