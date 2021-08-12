const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js'),
  },
  output: {
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      filename: 'server.html',
      excludeChunks: ['server'],
      minify: false,
      client: 'client.bundle.js',
    }),
  ],
});
