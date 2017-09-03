'use strict';

const mongoose = require('mongoose');
const model = require('./mongoModel.js');

class user extends model { 

  get collectionName() {
    return 'user';
  }

  get schema() {
    return  mongoose.Schema({
      name: String,
      pwd: String,
      desc: String
    });
  }

}

module.exports = new user();