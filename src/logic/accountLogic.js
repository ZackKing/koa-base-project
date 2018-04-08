'use strict';

const log = require('pino')();
const db = require('../services/db.js');
const account = require('../models/account.js');

module.exports = class accountLogic {

  constructor() {
    this.className = 'accountLogic';
  }

  async getAllAccount() {
    return await account.model.findAll();
  }

  async testError() {
    log.info('logic error before');
    throw new Error('logic error');
    log.info('logic error after');
  }

  async testInsert() {
    //事务
    const transaction = await db.transaction();

    const res = await account.model.create({
      account: 'testAccount',
      phone: '13888888888',
      password: 'testpwdtestpwdtestpwdtestpwdtest',
      salt: 'test',
      status: true
    }, { transaction });
    log.info(res.dataValue);

    await transaction.commit();

  }

  async testUpdate() {
    const res = await account.model.update({
      status: true
    }, {
      where: {
        account: 'testAccount'
      }
    });
    log.info(res);
  }

};