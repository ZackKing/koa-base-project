'use strict';
const log = require('pino')();

module.exports = async (ctx, next) => {
	try {
    await next();
  } catch (error) {
    log.error(error);
    ctx.status = error.status || error.status || 500;

    await ctx.render('error', {
      title: 'Error Info',
      statusCode:  ctx.status,
      error:  error.name,
      message: error.message
    });
  
  }
};