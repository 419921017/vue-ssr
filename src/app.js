import Vue from 'vue';

import App from './components/App.vue';

// const vm = new Vue({
//   render: (h) => h(App),
// });

// vm.$mount('#app');

// 入口改装成了函数
export default () => {
  const app = new Vue({
    render: (h) => h(App),
  });
  return { app };
};
