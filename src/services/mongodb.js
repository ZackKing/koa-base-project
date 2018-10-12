
const mongoose = require('mongoose');
const { mongodbConfig } = require('../config');

mongoose.Promise = Promise;

let uri = '';
if (mongodbConfig.password) {
  uri = `mongodb://${encodeURI(mongodbConfig.username)}`
    + `:${encodeURI(mongodbConfig.password)}`
    + `@${mongodbConfig.host}`
    + `:${mongodbConfig.port}`
    + `/${mongodbConfig.database}`;
} else {
  uri = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.database}`;
}

mongoose.connect(uri);
module.exports = mongoose;