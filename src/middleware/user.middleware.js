const bcrypt = require('bcryptjs');

const { getUserInfo } = require('../service/user.service.js');
const {
  userFormatError,
  userAlreadyExists,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.type.js');

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    // ctx.app.emit方法是用来触发事件的
    // 第一个参数是事件名称，第二个参数是事件处理函数，第三个参数是事件的上下文
    ctx.app.emit('error', userFormatError, ctx);
    return;
  }

  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      ctx.app.emit('error', userAlreadyExists, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }

  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  // 1. 加密密码
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hashPassword;

  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 1. 判断用户是否存在
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }

    // 2. 验证密码
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(12, err);
    ctx.app.emit('error', userLoginError, ctx);
    return;
  }

  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
};
