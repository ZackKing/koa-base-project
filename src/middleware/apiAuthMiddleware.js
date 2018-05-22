
const log = require('pino')();

module.exports = async (ctx, next) => {

  let whiteList = ['/api/login'];

  if (whiteList.indexOf(ctx.path) === -1 && !ctx.session.auth) {
    ctx.body = {
      code:  100001,
      error:  '认证失败!',
      message: '接口认证失败!'
    };
    return ctx;
  }

  await next();

  return true;
};