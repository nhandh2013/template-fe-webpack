const path= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    name: 'Template Webpack',
    mode: isProduction ? 'production' : 'development',
    entry: ['./src/scripts/main.js','./src/styles/main.scss' ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${isProduction ? '[hash]' + '.' : ''}bundle.js`,
      publicPath: '/'
    },
    devServer: {
      hot: true,
      open: true,
      port: 3002,
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [ {
            loader: 'html-loader'
          }],
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'jshint-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true
              },
            }
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: path.resolve(__dirname, '../src/assets/'),
                name: '[name].[ext]',
                publicPath: './images',
                outputPath: 'images',
              },
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'src/assets/images/')
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: './src/views/index.pug',
        inject: true,
      }),
      new ExtractTextPlugin({
        filename: `${isProduction ? '[hash]' + '.' : ''}bundle.css`,
        allChunks: true,
      }),
    ]
  };
};