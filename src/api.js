
const koa = require('koa');
const koaBody = require('koa-body');
const routers = require('./routers/api');
const session = require('koa-session');
const { koaConfig, sessionConfig } = require('./config');
const errorMiddleware = require('./middleware/apiErrorMiddleware.js');
const authMiddleware = require('./middleware/apiAuthMiddleware');
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

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(koaConfig.apiPort);
console.log(`koa api server port: ${koaConfig.apiPort}`);