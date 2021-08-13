import Vue from 'vue';

import createRouter from './router';
import createStore from './store';
import App from './components/App.vue';

// const vm = new Vue({
//   render: (h) => h(App),
// });

// vm.$mount('#app');

// 入口改装成了函数
export default () => {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store };
};
