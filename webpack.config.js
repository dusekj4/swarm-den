var app_root = 'web-src'; 
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  app_root: app_root,
  entry: [
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  output: {
    path: './public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ],
  }
};
