'use strict';

const log = require('pino')();
const accountLogic = new (require('../logic/accountLogic.js'))();

module.exports = class testController {

  static async index(ctx) {
    
    // log.info(ctx.query);

    // ctx.body = '<h1>hello koa demo!</h1>';
    
    // await accountLogic.testInsert();
    
    await accountLogic.testUpdate();
  
  }

  static async indexPost(ctx) {

  	ctx.body = 'hello koa demo! this is post message! body: ' + JSON.stringify(ctx.request.body);
  
  }

  static async indexPut(ctx) {
  	
  	ctx.body = 'hello koa demo! this is put message! id: ' + ctx.params.id + '  body: ' + JSON.stringify(ctx.request.body);

  }

  static async indexDel(ctx) {

  	ctx.body = 'hello koa demo! this is put message! id: ' + ctx.params.id + '  body: ' + JSON.stringify(ctx.request.body);

  }

  static async testError(ctx) {
    // ctx.errorType = 'web';

    log.info('error before');
    // assert(false, 'assert error');
    // throw new Error('error error error');
    // ctx.throw(400, 'error test');
    ctx.assert(false, 404, 'assert 404 error');
    log.info('error after');
  }

  static async testOtherError(ctx) {

    await accountLogic.testError();

    log.info('error after');

    return ctx;
  }

};