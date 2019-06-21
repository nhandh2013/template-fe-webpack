const path= require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  name: 'Template Webpack',
  mode: 'development',
  entry: ['./src/scripts/main.js','./src/styles/main.scss' ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].bundle.js'
  },
  devServer: {
    hot: true,
    open: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/views/index.pug'
    }),
    new ExtractTextPlugin({
      filename: '[hash].bundle.css',
      allChunks: true,
    })
  ]
};