
const log = require('pino')();

module.exports = async (ctx, next) => {
	try {
    await next();

    if (ctx.status === 404) {
      await ctx.render('error', {
        title: '404 NOT FOUND',
        code:  404,
        error:  'NOT FOUND',
        message: 'Your page was lost !'
      });
    }
    
  } catch (error) {
    log.error(error);
    ctx.status = error.status || error.status || 500;

    await ctx.render('error', {
      title: 'Error Info',
      code:  ctx.status,
      error:  error.name,
      message: error.message
    });
  
  }
};