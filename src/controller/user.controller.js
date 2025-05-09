const jwt = require('jsonwebtoken');

const {
  createUser,
  getUserInfo,
  updateById
} = require('../service/user.service.js');

const {
  userRegisterError,
  userLoginError
} = require('../constant/err.type.js');

const { JWT_SECRET, EXPIRESIN } = require('../config/config.default.js');
class UserController {
  async register(ctx, next) {
    // 1、获取数据
    const { user_name, password } = ctx.request.body;

    // 2、操作数据库
    try {
      const res = await createUser(user_name, password);
      // 3、返回结果
      ctx.body = {
        code: '200',
        data: {
          id: res.id,
          user_name: res.user_name
        },
        message: '用户注册成功'
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;

    // 1. 获取用户信息（在token的playload中，记录id，use_name，is_admin）
    try {
      // 从返回结果对象中剔除password属性，将剩下的属性放到res对象中
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: '200',
        data: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '10d' })
        },
        message: '用户登录成功'
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userLoginError, ctx);
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;

    // 1. 修改密码
    try {
      if (await updateById({ id, password })) {
        ctx.body = {
          code: '200',
          message: '修改密码成功'
        };
      } else {
        ctx.app.emit('error', userLoginError, ctx);
        return;
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userLoginError, ctx);
    }
  }
}

module.exports = new UserController();
