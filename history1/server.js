const Koa = require('koa');
const Router = require('koa-router');
const Vue = require('vue');
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

const vm = new Vue({
  data() {
    return {
      name: '123',
    };
  },
  template: '<div>hello {{name}}</div>',
});

const template = fs.readFileSync(
  path.resolve(__dirname, 'template.html'),
  'utf8'
);

router.get('/', async (ctx) => {
  //   ctx.body = await VueServerRender.createRenderer().renderToString(vm);
  ctx.body = await VueServerRender.createRenderer({ template }).renderToString(
    vm
  );
});

app.use(router.routes());

app.listen(3000, () => {
  console.log(`server start 3000`);
});
