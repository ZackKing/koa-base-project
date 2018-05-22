
const router = require('koa-router')();
const controller = require('../../controllers/demoController.js');

module.exports = {
  prefix: '/api/demo',

  router: router

    .get('/', controller.index)

    .post('/', controller.indexPost)

    .put('/:id', controller.indexPut)

    .del('/:id', controller.indexDel)
    
    .get('/testError', controller.testError)

    .get('/testOtherError', controller.testOtherError)

};