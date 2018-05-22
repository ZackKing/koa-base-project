
const log = require('pino')();
const _ = require('lodash');

module.exports = class BaseController {


  static async render(ctx, data = {}) {
    await ctx.render(data.path, data);
  }


  static success(ctx, data = null) {
    ctx.body = {
      code: 0,
      data: data
    };
  }


  static error(ctx, code, error = 'unknow error', message = '') {
    ctx.body = { 
      code, 
      error,
      message
    };
  }


  static test(ctx, data, fields = []) {
    return BaseController._test(ctx, fields, data);
  }


  static testQuery(ctx, fields = []) {

    const data = ctx.request.query;

    return BaseController._test(ctx, fields, data);
  }

  
  static testParams(ctx, fields = []) {

    const data = ctx.request.body.fields || ctx.request.body;

    return BaseController._test(ctx, fields, data);
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
            ctx.assert(field.values.indexOf(value) !== -1, 400, `'${field.name || field.key}' 值应该为[${field.values.join(',')}]`);
            break;
          default:
            break; 
        }

      } else {
        value = field.defaultValue;
      }
      
      object[field.key] = value;
    });

    return object;
  }


};