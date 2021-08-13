import createApp from './app';

// 服务端调用
// 每次都产生一个新的app
export default (context) => {
  const { url } = context;
  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp();
    // 重定向到根
    // 内部被重写了, 跳转 + 组件渲染
    // window.location.pathname
    router.push(url);

    router.onReady(() => {
      const matchComponents = router.getMatchedComponents();

      if (matchComponents.length === 0) {
        reject({ code: 404 });
      } else {
        // 服务端在渲染的时候, 默认会找到页面级组件中的asyncData
        // 并且在服务端创建一个vuex, 传递给asyncData
        Promise.all(
          matchComponents.map((component) => {
            if (component.asyncData) {
              return component.asyncData(store);
            }
          })
        ).then(() => {
          // 服务器执行完成后, 最新的状态保存到state上
          context.state = store.state;
          resolve(app);
        });
      }
    });
  });
};
