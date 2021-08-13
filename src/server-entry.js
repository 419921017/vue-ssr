import createApp from './app';

// 服务端调用
// 每次都产生一个新的app
export default ({ url }) => {
  return new Promise((resolve, reject) => {
    let { app, router } = createApp();
    // 重定向到根
    router.push(url);

    router.onReady(() => {
      const matchComponents = router.getMatchedComponents();
      if (matchComponents.length === 0) {
        reject({ code: 404 });
      } else {
        resolve(app);
      }
    });
  });
};
