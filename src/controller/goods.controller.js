const path = require('path');

const {
  fileUploadError,
  unSupportedFileType
} = require('../constant/err.type.js');

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileType = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file) {
      if (!fileType.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }

      ctx.body = {
        code: 200,
        message: '商品图片上传成功',
        data: {
          goods_img: path.basename(file.filepath)
        }
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }
}
module.exports = new GoodsController();
