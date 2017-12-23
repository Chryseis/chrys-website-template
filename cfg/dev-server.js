/**
 * Created by Administrator on 2017/11/19.
 */
const express = require('express');
const opn = require('opn');
const path = require('path');
const chalk = require('chalk');

const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');


const host = '127.0.0.1';
const port = '8082';

const app = express();
const compiler = webpack(webpackConfig);



const devMiddleware=require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: false
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    heartbeat: 2000
})

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(chalk.blue(' # Access URLs:'));
    console.log(chalk.gray(' ----------------------------------------'));
    console.log('     Local: ' + chalk.green('http://localhost:' + port));
    console.log(chalk.gray(' ----------------------------------------'));
    console.log('');


    opn('http://' + host + ':' + port);
});