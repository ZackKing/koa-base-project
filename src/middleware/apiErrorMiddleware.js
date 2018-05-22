
const log = require('pino')();

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    log.error(error);
    ctx.status = error.status || error.status || 500;

    ctx.body = {
      statusCode:  ctx.status,
      error:  error.name,
      message: error.message
    };    
    
  }
};