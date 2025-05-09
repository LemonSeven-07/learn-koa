const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');

const errHandler = require('./errHandler.js');
const router = require('../router/index.js');

const app = new Koa();

app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      // 在配置选项option里，不推荐使用相对路径
      // 在option里相对路径不是相对于当前文件， 而是相对process.cwd()
      uploadDir: path.join(__dirname, '../uploads'), // 设置文件上传目录
      keepExtensions: true // 保留文件扩展名
    }
  })
);

// 静态资源托管
app.use(KoaStatic(path.join(__dirname, '../uploads')));
app.use(router.routes());
app.use(router.allowedMethods());

// 统一处理异常
app.on('error', errHandler);
module.exports = app;
