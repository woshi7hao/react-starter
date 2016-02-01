var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/js/app'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    alias: {
      'Style': path.join(__dirname, '/src/styles')
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:3000' })
  ],

  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },{
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }, {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
