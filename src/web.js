'use strict';

const koa = require('koa');
const path = require('path');
const logger = require('pino')();
const views = require('koa-views');
const koaBody = require('koa-body');
const { webRouters } = require('./routers');
const session = require('koa-session');
const koaStatic = require('koa-static');
const { koaConfig, sessionConfig } = require('./config');

const errorMiddleware = require('./middleware/webErrorMiddleware.js');

const sessionStore = require('./services/sessionStore.js');
require('./services/db.js');
require('./services/redis.js');

const app = new koa();

//koa keys
app.keys = koaConfig.keys;

//error middleware
app.use(errorMiddleware);

//session middleware
sessionConfig.store = sessionStore;
app.use(session(sessionConfig, app));

// logger
app.use((ctx, next) => {
  logger.info(`request: ${ctx.request.method} ${ctx.request.url}`);
  return next();
});

// ctx.body
app.use(koaBody({ multipart: true }));
app.use((ctx, next) => {
  if (ctx.request.body.fields) ctx.request.body = ctx.request.body.fields;
  return next();
});

// static folder
app.use(koaStatic(
  path.join(__dirname , '../static')
));

// ejs views
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

// routers
app.use(webRouters.routes()).use(webRouters.allowedMethods());

// listen start
app.listen(koaConfig.port);
console.log(`koa web server port: ${koaConfig.port}`);
