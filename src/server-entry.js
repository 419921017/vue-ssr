import createApp from './app';

// 服务端调用
// 每次都产生一个新的app
export default () => {
  let { app } = createApp();
  return app;
};
