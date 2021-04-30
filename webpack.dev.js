const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


const scssRule = common.module.rules.find(x => x.test.test(".scss"));

scssRule.use.unshift('style-loader');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        
    ],
    module: {
        rules: [
            
        ],
    },
    devServer: {
        contentBase: './dist',
        watchContentBase: true
    },
});