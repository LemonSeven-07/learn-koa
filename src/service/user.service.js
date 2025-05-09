const User = require('../model/user.model.js');
// 数据库操作
class UserService {
  async createUser(user_name, password) {
    // 1. 插入数据到数据库
    const res = await User.create({
      user_name,
      password
    });
    // 2. 判断数据是否插入成功
    return res.dataValues;
  }

  // 查询用户信息
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    // 1. 查询数据 findOne方法用于查询一条数据
    // 2. findAll方法用于查询多条数据
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    });
    return res ? res.dataValues : null;
  }

  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};

    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    // 1. 更新数据
    const res = await User.update(newUser, {
      where: whereOpt
    });
    // 2. 判断数据是否更新成功
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
