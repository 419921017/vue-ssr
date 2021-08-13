const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const Vue = require('vue');
const Render = require('vue-server-renderer');

const app = new Koa();
const router = new Router();

const serverBundle = fs.readFileSync(
  path.resolve(__dirname, './dist/server.bundle.js'),
  'utf8'
);

const template = fs.readFileSync(
  path.resolve(__dirname, './dist/server.html'),
  'utf8'
);

// 调用函数, 获取实例
const render = Render.createBundleRenderer(serverBundle, { template });

// router.get('/', async (ctx) => {
//   //   const html = await render.renderToString();
//   //   console.log(html);
//   // 如果要让css生效, 需要使用回调的方式, 不能使用promise
//   ctx.body = await new Promise((resolve, reject) => {
//     // 纯字符串
//     render.renderToString({ url: ctx.url }, (err, html) => {
//       if (err) reject(err);
//       resolve(html);
//     });
//   });
//   //   ctx.body = html;
// });

// 用户访问一个不存在的服务器端路径, 服务端返回首页, 通过前端js渲染的时候, 会重新根据路径渲染组件
// 刷新浏览器, 向服务器请求
router.get('/(.*)', async (ctx) => {
  ctx.body = await new Promise((resolve, reject) => {
    // 根据实例生成纯字符串
    render.renderToString({ url: ctx.url }, (err, html) => {
      if (err && err.code == 404) {
        ctx.status = 404;
        resolve(`not found`);
      }
      resolve(html);
    });
  });
});

// 1. 默认先查找静态目录
app.use(static(path.resolve(__dirname, 'dist')));
// 2. 再查找路由
app.use(router.routes());

app.listen(3000);

// 所有页面直接访问都是服务端渲染(包括刷新)
// 第一次加载页面是服务端渲染, 后续是通过前端路由
