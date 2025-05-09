const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');

const errHandler = require('./errHandler.js');
const router = require('../router/index.js');

const app = new Koa();

app.use(koaBody());

// 静态资源托管
app.use(KoaStatic(path.join(__dirname, '../uploads')));
app.use(router.routes());
app.use(router.allowedMethods());

// 统一处理异常
app.on('error', errHandler);
module.exports = app;
