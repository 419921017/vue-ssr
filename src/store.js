import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 服务端使用vuex, 将数据保存到全局变量window中, 服务端渲染完毕后进行替换
export default () => {
  let store = new Vuex.Store({
    state: {
      name: 'zf',
    },
    mutations: {
      changeName(state) {
        state.name = 'jw';
      },
    },
    actions: {
      changeName({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName', 'GD');
            resolve();
          }, 1000);
        });
      },
    },
  });
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    // 浏览器渲染
    // 用服务端加载好的数据替换掉
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
};
