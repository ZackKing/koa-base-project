
const config = require('../config');
const router = require('koa-router')();
const Controller = require('./Controller');

module.exports = class Common extends Controller {


  static get routers() {
    return {
      prefix: '/common',
      router: router
        .get('/doc', Common.doc)
        .get('/error', Common.error)
    };
  }


  /**
   * @api {get} /api/common/doc 字典
   * @apiGroup common
   * @apiSuccess {Number} code error code.
   */
  static async doc(ctx) {
    return super.success(ctx, config.doc);
  }


  /**
   * @api {get} /api/common/error 错误码
   * @apiGroup common
   * @apiSuccess {Number} code error code.
   */
  static async error(ctx) {
    return super.success(ctx, config.doc);
  }


};