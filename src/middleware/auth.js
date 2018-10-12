
const log = require('../services/log');
const session = require('../services/session');

module.exports = async (ctx, next) => {

  let whiteList = [
    '/api/common/doc',
    '/api/register',
    '/api/login'
  ];

  if (whiteList.indexOf(ctx.path) === -1) { //非白名单
    
    if (typeof ctx.header.authorization === 'undefined') return ctx.throw(401, 'Authorization Undefined');

    try {
      ctx.auth = session.verify(ctx.header.authorization);
    } catch(e) {
      return ctx.throw(401, 'Authorization Verify False');
    }

    ctx.sess = await session.get(ctx.auth.uid);
    if (!ctx.sess) return ctx.throw(401, 'Session Undefined');
    if (ctx.sess.token != ctx.header.authorization) return ctx.throw(401, 'Authorization Invalid');
  }

  await next();

  if (ctx.auth) {
    if (ctx.sess === false) {
      await session.del(ctx.auth.type, ctx.auth.uid);
    } else {
      await session.set(ctx.auth.type, ctx.auth.uid, ctx.sess);
    }
  }

  return true;
};