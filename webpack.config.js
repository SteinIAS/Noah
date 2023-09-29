const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //   mode: 'development',
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/script.min.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: false,
      inject: 'body'
    })
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ['./src/**/*.html']
  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // Disables attribute quotes to match your HTML style
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: { filename: './img/[name][ext]' }
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: { filename: './fonts/[name][ext]' }
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/scss/')
    }
  },
  stats: {
    warnings: false,
    errorDetails: true
  }
};
