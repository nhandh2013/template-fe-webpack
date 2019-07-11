const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    open: true,
    port: 3003,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    },
    contentBase: './dist'
  },
  module: {
    rules: [
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
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
  ]
});
