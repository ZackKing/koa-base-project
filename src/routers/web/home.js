
const router = require('koa-router')();
const controller = require('../../controllers/homeController.js');

module.exports = {
  prefix: '/',

  router: router

    .get('/', controller.homeWeb)

    .get('showUser', controller.showUser)

    .get('showAccount', controller.showAccount)

};