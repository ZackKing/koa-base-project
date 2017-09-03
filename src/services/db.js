'use strict';

const Sequelize = require('sequelize');
const { dbConfig } = require('../config');

module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.passwd, 
  dbConfig.option
);