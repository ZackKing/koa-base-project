
const mongoose = require('mongoose');
const Model = require('./Model');

module.exports =  class User extends Model { 

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

};