
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const fileNameArray = fs.readdirSync(path.join(__dirname, './'));

let allController = {};

for (let i = 0; i < fileNameArray.length; i++) {
  if (fileNameArray[i].indexOf('.js') === -1 || fileNameArray[i] == 'index.js' || fileNameArray[i] == 'Controller.js') 
    continue;

  const Controller = require(`./${fileNameArray[i]}`);

  allController[fileNameArray[i].replace('.js', '')] = Controller;

  router.use('/api' + Controller.routers.prefix , Controller.routers.router.routes(), Controller.routers.router.allowedMethods());
}

allController.routers = router;

module.exports = allController;