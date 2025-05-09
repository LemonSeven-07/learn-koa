const Router = require('koa-router');

const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { uploadMiddleware } = require('../middleware/upload.middleware');

const { upload } = require('../controller/goods.controller');

const router = new Router({ prefix: '/goods' });

router.post('/upload', uploadMiddleware, auth, hadAdminPermission, upload);

module.exports = router;
