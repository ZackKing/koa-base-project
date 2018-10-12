
const koa = require('koa');
const koaBody = require('koa-body');
const { routers } = require('./controllers');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errMiddleware = require('./middleware/err');

//init db connect
require('./services/db');
require('./services/redis');

const app = new koa();
app.keys = config.base.keys;

app.use(errMiddleware);

app.use(authMiddleware);

app.use(koaBody({ multipart: true }));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.base.port);
console.log(`api server port: ${config.base.port}`);