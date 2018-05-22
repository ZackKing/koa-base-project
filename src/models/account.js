
const db = require('../services/db.js');
const Sequelize = require('sequelize');

module.exports = class Account {

  static get tableName() {
    return 'demo_account';
  }

  static get attributes() {
    return {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      account: { type: Sequelize.STRING(64), allowNull: false, unique: true, comment: '账号' },
      phone: { type: Sequelize.STRING(11), allowNull: true, comment: '手机号码' },
      password: { type: Sequelize.STRING(32), allowNull: false, comment: '密码' },
      salt: { type: Sequelize.STRING(6), allowNull: false, comment: '盐值' },
      status: { type: Sequelize.BOOLEAN, allowNull: false, comment: '状态 0停用 1正常' },
      createdTime: { type: 'TIMESTAMP', defaultValue: Sequelize.NOW },
      updatedTime: { type: 'TIMESTAMP', defaultValue: Sequelize.NOW }
    };
  }

  static async create() {
    await account.model.sync();
  }

  static get model() {
    return db.define('account', account.attributes, {

      tableName: 'demo_account',

      engine: 'InnoDB',

      charset: 'utf8mb4',

      comment: '账户表',

      // don't forget to enable timestamps! if you want to use paranoid
      timestamps: false,

      // I don't want createdAt
      // createdAt: false,

      // I want updatedAt to actually be called updateTimestamp
      // updatedAt: 'updateTimestamp',

      // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
      // deletedAt: 'destroyTime',

      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      // paranoid: true,

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      // underscored: true,

      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true

      // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
      // to the model and throw an OptimisticLockingError error when stale instances are saved.
      // Set to true or a string with the attribute name you want to use to enable.
      // version: true

    });
  }


};