const fs = require('fs');

const Router = require('koa-router');
const router = new Router();

// __dirname 是当前文件所在目录的绝对路径
// 通过 fs.readdirSync() 方法读取目录下的所有文件
// 然后使用 forEach() 方法遍历每个文件
// 如果文件名不是 index.js，则使用 require() 方法引入该文件
// 最后使用 router.use() 方法将每个文件的路由注册到 router 对象中
// 这样可以实现动态加载路由文件
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    const filePath = require('./' + file);
    router.use(filePath.routes());
  }
});

module.exports = router;
