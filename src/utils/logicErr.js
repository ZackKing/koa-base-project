
const config = require('../config');

class logicErr{

  throw(code, error = '', msg = '') {
    let err = new Error(msg);
    err.code = code;

    if (config.err[code]) {

      err.name = error || config.err[code].err;
      err.msg = msg || config.err[code].msg;

    } else {

      err.name = error || 'unknow logic error';
      err.msg = error || 'unknow logic error msg';
      
    }

    throw err;
  }

}

module.exports = new logicErr();