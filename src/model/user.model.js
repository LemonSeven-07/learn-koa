const { DataTypes } = require('sequelize');

const seq = require('../db/seq.js');

// 创建用户模型(如果没有直接告诉表名，sequelize会自动创建一个表，表名为小写复数形式)
// 例如：user => users
// 通过sequelize.define()方法定义模型
// 1. 第一个参数是表名
// 2. 第二个参数是表的字段
// 3. 第三个参数是表的配置项
// 通过添加表的配置项，可以直接告诉sequelize表的名称
// 例如：tableName: 'user'，则表名为user
const User = seq.define(
  'user',
  {
    // id会被sequelize自动创建
    user_name: {
      type: DataTypes.STRING, // sequelize提供的类型，具体类型可以查看sequelize的文档
      allowNull: false, // 字段是否允许为空
      unique: true,
      comment: '用户名，唯一  不重复'
    },
    password: {
      type: DataTypes.CHAR(64), // sequelize提供的类型，具体类型可以查看sequelize的文档
      allowNull: false,
      comment: '密码'
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否是管理员，0：不是，1：是'
    }
  }
  // {
  //   timestamps: false // 是否自动向表中添加时间戳（使用sequelize创建表默认会生成时间戳字段）
  // }
);

// 通过sequelize.sync()方法创建表
// 1. force: true 会删除表，重新创建表
// 2. force: false 不会删除表，直接创建表
// 3. alter: true 会根据模型的定义，自动修改表的结构
// 4. { force: true, alter: true } 会删除表，重新创建表，并根据模型的定义，自动修改表的结构
// 5. { force: false, alter: true } 不会删除表，直接创建表，并根据模型的定义，自动修改表的结构
// 6. { force: true, alter: false } 会删除表，重新创建表，不会根据模型的定义，自动修改表的结构
// 7. { force: false, alter: false } 不会删除表，直接创建表，不会根据模型的定义，自动修改表的结构
// 表创建成功后无需再次创建表（可以将此段代码注释掉）
// User.sync({ force: true })
//   .then(() => {
//     console.log('用户表创建成功');
//   })
//   .catch((err) => {
//     console.log('用户表创建失败', err);
//   });

module.exports = User;
