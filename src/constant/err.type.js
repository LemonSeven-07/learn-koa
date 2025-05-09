const { TokenExpiredError } = require('jsonwebtoken');

module.exports = {
  userFormatError: {
    code: '10001',
    message: '用户名或密码不能为空',
    result: ''
  },
  userAlreadyExists: {
    code: '10002',
    message: '用户名已存在',
    result: ''
  },
  userNotFound: {
    code: '404',
    message: '用户不存在',
    result: ''
  },
  passwordError: {
    code: '401',
    message: '密码错误',
    result: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: ''
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: ''
  },
  invalidPassword: {
    code: '10006',
    message: '密码错误',
    result: ''
  },
  tokenExpiredError: {
    code: '401',
    message: 'token过期',
    result: ''
  },
  jsonWebTokenError: {
    code: '401',
    message: 'token无效',
    result: ''
  },
  tokenFormatError: {
    code: '401',
    message: 'token验证失败',
    result: ''
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    result: ''
  },
  fileUploadError: {
    code: '10007',
    message: '商品图片上传失败',
    result: ''
  },
  unSupportedFileType: {
    code: '10008',
    message: '不支持的文件类型',
    result: ''
  }
};
