import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Foo from './components/Foo.vue';

export default () => {
  let router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Foo },
      { path: '/bar', component: () => import('./components/Bar.vue') },
      {
        path: '*',
        component: {
          render: (h) => h('div', {}, '404'),
        },
      },
    ],
  });

  return router;
};
