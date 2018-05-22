
const log = require('pino')();

module.exports = async (ctx, next) => {

  let whiteList = ['/login'];

  if (whiteList.indexOf(ctx.path) === -1) {
    if (!ctx.session.auth) {
      log.info('未登录');
      return await ctx.redirect('/login');
    }
  }

  await next();

  return true;
};