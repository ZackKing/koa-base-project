
const log = require('../services/log');
const _ = require('lodash');

module.exports = class Controller {

  static success(ctx, data = null) {
    ctx.body = {
      code: 0,
      data: data
    };
  }


  static error(ctx, code, err = 'unknow error', msg = '') {
    ctx.body = { 
      code, 
      err,
      msg
    };
  }

  static emptyList(ctx) {
    ctx.body = { 
      limit: 0, 
      offset: 0,
      total: 0,
      list: []
    };
  }

  static currentUid(ctx) {
    return ctx.sess.uid;
  }


  static checkType(ctx, type) {
    if (ctx.sess.type != type) {
      if (type == 'client') ctx.logicError.throw(1101);
      else if (type == 'teacher') ctx.logicError.throw(1201);
    }
  }


  static test(ctx, data, fields = []) {
    return Controller._test(ctx, fields, data);
  }


  static testQuery(ctx, fields = []) {
    const data = ctx.request.query;
    return Controller._test(ctx, fields, data);
  }

  
  static testParams(ctx, fields = []) {
    const data = ctx.request.body.fields || ctx.request.body;
    return Controller._test(ctx, fields, data);
  }


  static _test(ctx, fields, data) {
    let object = {};

    fields.map(field => {

      let value = data[field.key];

      if (field.required) {
        ctx.assert(typeof value !== 'undefined', 400, `'${field.key}' 不可为空!`);
      }

      if (typeof value != 'undefined') {

        switch(field.type) {
          case 'number':
            value = +value;
            ctx.assert(!isNaN(value), 400, `'${field.key}' 类型应该为 number`);
            if (field.min) ctx.assert(value >= field.min, 400, `'${field.name || field.key}' 值应该不小于${field.min}`);
            if (field.max) ctx.assert(value <= field.max, 400, `'${field.name || field.key}' 值应该不大于${field.max}`);
            break;

          case 'string':
            ctx.assert(_.isString(value), 400, `'${field.name || field.key}' 类型应该为 string`);
            if (field.min) ctx.assert(value.length >= field.min, 400, `'${field.name || field.key}' 长度应该不少于${field.min}`);
            if (field.max) ctx.assert(value.length <= field.max, 400, `'${field.name || field.key}' 长度应该不长于${field.max}`);
            break;

          case 'array':
            ctx.assert(_.isArray(value), 400, `'${field.name || field.key}' 类型应该为 array`);
            break;

          case 'boolean':
            if (value === 'true') value = true;
            if (value === 'false') value = false;
            ctx.assert(typeof value == 'boolean', 400, `'${field.name || field.key}' 类型应该为 boolean`);
            break;

          case 'enum':
            value = `${value}`;
            ctx.assert(field.values.indexOf(value) !== -1, 400, `'${field.name || field.key}' 值应该为[${field.values.join(',')}]`);
            break;

          case 'json':
            if (value.length == 0) {
              value = null;
              break;
            }
            try {
              value = JSON.parse(value);
            } catch(e) {
              ctx.assert(false, 400, `'${field.name || field.key}' 应该为符合json规范的string类型`);
            }
            break;
            
          default:
            break; 
        }

      } else {
        value = field.default;
      }
      
      object[field.key] = value;
    });

    return object;
  }

};