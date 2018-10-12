
const _ = require('lodash');
const log = require('../services/log');
const config = require('../config');
const logicErr = require('../utils/logicErr');

module.exports = async (ctx, next) => {

  log.info(`[${ctx.method}]${ctx.path}`);
  ctx.logicErr = logicErr;

  try {

    await next();

  } catch (err) {

    if (err.code) {
      log.error('自定义逻辑错误: ', err.code, err.name, err.msg);
    } else {
      log.error(err);
    }

    log.info('123456', err);

    if (err.code) ctx.status = 200;
    else ctx.status = err.status || 500;
   
    ctx.body = {
      code:  err.code || err.status || 500,
      err:  err.name,
      msg: err.msg
    };

    console.log('123', ctx.body);
  }
};