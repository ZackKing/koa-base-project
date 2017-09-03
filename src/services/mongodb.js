'use strict';

const mongoose = require('mongoose');
const { mongodbConfig } = require('../config');

mongoose.Promise = Promise;

module.exports = mongoose
  .connect(`mongodb://${encodeURI(mongodbConfig.username)}`
    + `:${encodeURI(mongodbConfig.password)}`
    + `@${mongodbConfig.host}`
    + `:${mongodbConfig.port}`
    + `/${mongodbConfig.database}`, 
    { useMongoClient: true }
  );