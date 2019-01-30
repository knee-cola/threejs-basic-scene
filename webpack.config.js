const path = require('path');

module.exports = {
  entry: './main.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '_site')
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: './_site',
    host: '0.0.0.0', // listen on all IP addresses
    port: 8081 // port needs to be different form the one on which the 
  },
};