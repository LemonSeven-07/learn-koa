const path = require('path');

const { koaBody } = require('koa-body');
const uploadMiddleware = koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    // 在配置选项option里，不推荐使用相对路径
    // 在option里相对路径不是相对于当前文件， 而是相对process.cwd()
    uploadDir: path.join(__dirname, '../uploads'), // 设置文件上传目录
    keepExtensions: true // 保留文件扩展名
    // maxFileSize: 5 * 1024 * 1024, // 限制 5MB
  }
});

module.exports = {
  uploadMiddleware
};
