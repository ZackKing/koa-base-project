
const Sequelize = require('sequelize');
const Model = require('./Model.js');

module.exports = class User extends Model {

  get name() {
    return 'user';
  }

  get attr() {
    return {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      account: { type: Sequelize.STRING(64), allowNull: false, unique: true },
      phone: { type: Sequelize.STRING(11), allowNull: true },
      password: { type: Sequelize.STRING(32), allowNull: false },
      salt: { type: Sequelize.STRING(6), allowNull: false },
      status: { type: Sequelize.BOOLEAN, allowNull: false },
      createdTime: { type: 'TIMESTAMP', defaultValue: Sequelize.NOW },
      updatedTime: { type: 'TIMESTAMP', defaultValue: Sequelize.NOW }
    };
  }

  get map() {
    return {
      type: {
        teacher: { code: 1, text: 'teacher' },
        client: { code: 2, text: 'client' }
      },
      _type: {
        1: 'teacher',
        2: 'client'
      },
      status: {
        active: { code: 1, text: 'active' },
        inactive: { code: 0, text: 'inactive' }
      },
      _status: {
        0: 'inactive',
        1: 'active'
      }
    };
  }

  get option() {
    return {
      tableName: this.tableName,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      comment: 'user table',
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
    };
  }

  get initData() {
    return [
      { 
        account: 'admin',
        phone: '13888888888',
        password: 'c7935cc8ee50b752345290d8cf136827',
        salt: 'abcdef',
        status: 1
      }
    ];
  }


};