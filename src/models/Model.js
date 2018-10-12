
const db = require('../services/db');
const Sequelize = require('sequelize');

module.exports = class Model {

  get conn() {
    return db;
  }

  get model() {
    return db.define(this.name, this.attr, this.option);
  }

  async init() {
    await this.model.sync();
    if (typeof this.initData !== 'undefined') {
      for (let i = 0; i < this.initData.length; i++) {
        await this.model.create(this.initData[i]);
      }
    }
  }

};