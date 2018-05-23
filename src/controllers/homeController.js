
const log = require('pino')();
const BaseController = require('./BaseController.js');
const accountLogic = new (require('../logic/AccountLogic.js'))();

module.exports = class homeController extends BaseController {

  static async home(ctx) {

    ctx.session.count = ctx.session.count || 0;

    log.info(ctx.session.count);
    ctx.session.count++;
    await ctx.render('home/home', {
      title: 'hello'
    });

  }

  static async list(ctx) {

    const list = await accountLogic.getAllAccount();

    await ctx.render('home/accountList', {
      title: 'account list',
      list: list
    });

  }

  static async info(ctx) {
    ctx.body = JSON.stringify({ name: 'zack' });
  }

};