const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const scssRule = common.module.rules.find(x => x.test.test(".scss"));
scssRule.use.unshift(MiniCssExtractPlugin.loader);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
  ],
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
});