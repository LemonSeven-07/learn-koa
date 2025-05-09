const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.default.js');

const {
  tokenExpiredError,
  jsonWebTokenError,
  tokenFormatError,
  hasNotAdminPermission
} = require('../constant/err.type.js');

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.headers;
  const token = authorization.replace('Bearer ', '');
  try {
    // 1. 验证token是否过期
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        // 1. token过期
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        // 2. token无效
        return ctx.app.emit('error', jsonWebTokenError, ctx);
      default:
        return ctx.app.emit('error', tokenFormatError, ctx);
    }
  }
  await next();
};

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    return ctx.app.emit('error', hasNotAdminPermission, ctx);
  }
  await next();
};

module.exports = {
  auth,
  hadAdminPermission
};
