
const c = require('../utils/common.js');
const router = require('koa-router')();
const time = require('../utils/time');
const Controller = require('./Controller');
const session = require('../services/session');

const UserLogic = require('../logic/User');
const userLogic = new UserLogic();


module.exports = class Auth extends Controller {


  static get routers() {
    return {
      prefix: '/',
      router: router
        .post('login', Auth.login)
        .post('register', Auth.error)
        .post('logout', Auth.logout)
    };
  }


  /**
   * @api {post} /api/login 登录
   * @apiGroup Auth
   * @apiParam {String} account 账号.
   * @apiParam {String} password 密码.
   * @apiSuccess {Number} code error code.
   */
  static async login(ctx) {

    const {account, password} = super.testParams(ctx, [
      { key: 'account', type: 'string', min: 5, max: 11, required: true },
      { key: 'password', type: 'string', min: 6, required: true }
    ]);

    let user = await userLogic.getByAccount(account);
    if (!user) ctx.logicErr.throw(1000);

    let safePass = c.md5(c.md5(password) + user.salt);
    if (user.password != safePass) ctx.logicErr.throw(1001);

    let auth = { uid: user.id };
    let token = session.sign(auth);
    await session.set(auth.uid, {
      token,
      uid: auth.uid,
      time: time.timeStamp()
    });

    return super.success(ctx, { token });
  }


  /**
   * @api {post} /api/register 注册
   * @apiGroup Auth
   * @apiSuccess {Number} code error code.
   */
  static async register(ctx) {
    return super.success(ctx);
  }


  /**
   * @api {post} /api/logout 注销
   * @apiGroup Auth
   * @apiSuccess {Number} code error code.
   */
  static async logout(ctx) {
    ctx.sess = false;
    return super.success(ctx);
  }

};