var path = require('path');
//This makes index.html file and adds script for index_bundle file inside dist
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

//NODE_ENV to production
//uglify/minify code

var config = {
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
};

//If production push these plugins to plugins array
if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    //Minify Code plugin
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
