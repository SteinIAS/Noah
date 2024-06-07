const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const allFiles = fs.readdirSync(path.resolve(__dirname, 'src'));
const htmlPages = allFiles
  .filter((file) => file.endsWith('.html'))
  .map((file) => {
    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', file),
      filename: file,
      minify: false,
      inject: 'body'
    });
  });

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
    ...htmlPages
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
        // generator: { filename: './img/[name][ext]' }, // Use this line to copy all image files without checking the usage in htmls and comment the below generator
        generator: {
          filename: (pathData) => {
            const filepath = path
              .dirname(pathData.filename)
              .split('/')
              .slice(1)
              .join('/');
            return `${filepath}/[name][ext]`;
          }
        }
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
