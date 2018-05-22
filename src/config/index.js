
// production | development
const env = [process.env.NODE_ENV || 'development'];

console.log('use', env, 'config file');

module.exports = {
  koaConfig: require(`./${env}/koa.js`),
  dbConfig: require(`./${env}/db.js`),
  redisConfig: require(`./${env}/redis.js`),
  mongodbConfig: require(`./${env}/mongodb.js`),
  sessionConfig: require(`./${env}/session.js`)
};