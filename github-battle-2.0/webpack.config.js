var path = require('path');
//This makes index.html file and adds script for index_bundle file inside dist
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader' },
      {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  //this fixes redirect issue, causing any redirects to default to react router
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })]
}
