'use strict';

const koa = require('koa');
const log = require('pino')();
const koaBody = require('koa-body');
const { apiRouters } = require('./routers');
const session = require('koa-session');
const { koaConfig, sessionConfig } = require('./config');

const errorMiddleware = require('./middleware/apiErrorMiddleware.js');

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

// log
app.use((ctx, next) => {
  log.info(`request: ${ctx.request.method} ${ctx.request.url}`);
  return next();
});

// ctx.body
app.use(koaBody({ multipart: true }));
app.use((ctx, next) => {
  if (ctx.request.body.fields) ctx.request.body = ctx.request.body.fields;
  return next();
});

// routers
app.use(apiRouters.routes()).use(apiRouters.allowedMethods());

// listen start
app.listen(koaConfig.apiPort);
console.log(`koa api server port: ${koaConfig.apiPort}`);
