
const connection = require('../../services/mongodb.js');

module.exports = class mongoModel {

  get model() {
    if(!connection.models[this.collectionName]) 
      connection.model(this.collectionName, this.schema, this.collectionName);

    return connection.models[this.collectionName];
  }

  async insert(data) {

    let dbData = new this.model(data);

    return await dbData.save();
  }

};

