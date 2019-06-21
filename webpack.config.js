const path= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = function(env, argv) {
  const isProduction = argv.mode === 'production';
  return {
    name: 'Template Webpack',
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/scripts/main.js','./src/styles/main.scss' ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${isProduction ? [hash] + '.' : ''}bundle.js`
    },
    devServer: {
      hot: true,
      open: true,
      port: 3001,
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: "pug-loader",
              query: {
                pretty: false
              }
            }
          ],
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
        template: './src/views/index.pug',
        inject: true,
      }),
      new ExtractTextPlugin({
        filename: `${isProduction ? [hash] + '.' : ''}bundle.css`,
        allChunks: true,
      }),
    ]
  };
};