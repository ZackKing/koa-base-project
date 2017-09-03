'use strict';

const router = require('koa-router')();
const controller = require('../../controllers/homeController.js');

module.exports = router

  .get('/', controller.home)

  .get('showUser', controller.showUser)

  .get('showAccount', controller.showAccount);
