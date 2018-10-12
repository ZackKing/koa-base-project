
module.exports = {

  base: {
    port: 3000,
    keys: ['!@#$%^', 'koakoatest'],
    debug: true
  },

  jwt: {
    secret: 'koa-jwt-secret',
    option: {
      algorithm: 'HS256',
      expiresIn: 7 * 24 * 60 * 60
    }
  },

  session: {
    prefix: '_sess',
    ttl: 7 * 24 * 60 * 60
  },

  log: {
    level: 'info'
  },

  db: {
    database: 'koa_test',
    user: 'koa_test',
    passwd: '123456',
    option: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 1,
        min: 0,
        idel: 10000
      },
      timezone: '+08:00'
    }
  },

  redis: {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    // password: 'password',
    db: 0
  }

};