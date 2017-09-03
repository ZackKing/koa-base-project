'use strict';

const webRouter = require('koa-router')();
const apiRouter = require('koa-router')();

//web routers
const home = require('./web/home');
webRouter.use('/', home.routes(), home.allowedMethods());

//api routers
const demo = require('./api/demo');
apiRouter.use('/api', demo.routes(), demo.allowedMethods());

exports.webRouters = webRouter;
exports.apiRouters = apiRouter;
