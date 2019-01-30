const path = require('path');

module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: './docs',
    host: '0.0.0.0', // listen on all IP addresses
    port: 8080
  },
};