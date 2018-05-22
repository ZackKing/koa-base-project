
const koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const routers = require('./routers/web');
const session = require('koa-session');
const render = require('koa-art-template');
const { koaConfig, sessionConfig } = require('./config');
const errorMiddleware = require('./middleware/webErrorMiddleware.js');
const authMiddleware = require('./middleware/webAuthMiddleware');
const sessionStore = require('./services/sessionStore.js');

//init db connect
require('./services/db.js');
require('./services/redis.js');

const app = new koa();
app.keys = koaConfig.keys;

app.use(errorMiddleware);

sessionConfig.store = sessionStore;
app.use(session(sessionConfig, app));

app.use(koaBody({ multipart: true }));

app.use(authMiddleware);

render(app, {
  root: path.join(__dirname, './views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(koaConfig.port);
console.log(`koa web server port: ${koaConfig.port}`);