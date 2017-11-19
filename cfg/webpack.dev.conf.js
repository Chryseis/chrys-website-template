/**
 * Created by Administrator on 2017/11/19.
 */
const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let entry = {};

let htmlPlugin = [];

let entryDirArr = fs.readdirSync(path.resolve(__dirname, '../src'));

entryDirArr.forEach((dir, i) => {
    entry[dir] = ['webpack-hot-middleware/client?noInfo=false&reload=true', path.resolve(__dirname, '../src', `${dir}/${dir}.js`)];
});

Object.keys(entry).forEach((key, i) => {
    htmlPlugin.push(new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: path.resolve(__dirname, '../template', `${key}.html`),
        chunks: [`${key}`]
    }))
})

module.exports = merge(baseWebpackConfig, {
    entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('develop')
        }
    }), new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })].concat(htmlPlugin)
})