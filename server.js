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

const render = Render.createBundleRenderer(serverBundle, { template });

router.get('/', async (ctx) => {
  //   const html = await render.renderToString();
  //   console.log(html);
  // 如果要让css生效, 需要使用回调的方式, 不能使用promise
  ctx.body = await new Promise((resolve, reject) => {
    // 纯字符串
    render.renderToString((err, html) => {
      if (err) reject(err);
      resolve(html);
    });
  });
  //   ctx.body = html;
});

app.use(static(path.resolve(__dirname, 'dist')));
app.use(router.routes());

app.listen(3000);
