
const router = require('koa-router')();
const controller = require('../../controllers/HomeController.js');

module.exports = {
  prefix: '/',

  router: router

    .get('/', controller.home)

    .get('list', controller.list)

    .get('/:id', controller.info)

};