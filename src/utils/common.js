
const _ = require('lodash');
const crypto = require('crypto');

class Common {


  md5(str) {
    const generator = crypto.createHash('md5');
    generator.update(str);
    return generator.digest('hex');
  }


  randomStr(len = 4, buff = '') {

    buff = buff || 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let str = '';

    while (len --) {
      str += buff.charAt(this.randomInt(0, buff.length - 1));
    }

    return str;
  }


  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
  }


  genTree(list, key, pkey, root = 0, current = {}, tree = []) {
    
    if (this.isEmptyObj(current)) {
      current[key] = root;
    }
    let subList =  _.filter(list, item => { return item[pkey] == current[key]; });
    if (!_.isEmpty(subList)) {
      if(current[key] == root){
        tree = subList;
      } else {
        current['sub'] = subList;
      }

      subList.map(sub => {
        this.genTree(list, key, pkey, root, sub, tree);
      });
    }
    return tree;
  }


}

module.exports = new Common();