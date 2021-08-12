const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '../src/client-entry.js'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'client.html',
      open: true,
    }),
  ],
});
