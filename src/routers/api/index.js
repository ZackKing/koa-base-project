
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const fileNameArray = fs.readdirSync(path.join(__dirname, './'));

for (let i = 0; i < fileNameArray.length; i++) {
    if (fileNameArray[i].indexOf('.js') === -1 || fileNameArray[i] === 'index.js' ) 
      continue;

    const routers = require(`./${fileNameArray[i]}`);
    router.use('/api' + routers.prefix , routers.router.routes(), routers.router.allowedMethods());
}

module.exports = router;
