/**
 * Created by Administrator on 2017/11/19.
 */
const express = require('express');
const opn = require('opn');
const path = require('path');
const chalk = require('chalk');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.conf');


const host='127.0.0.1';
const port = '8080';

const app = express();
const compiler = webpack(webpackConfig);

app.use(require('connect-history-api-fallback')());

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    quiet: false,
    noInfo: false
}));

app.use(webpackHotMiddleware(compiler, {
    log: () => {
    }
}));


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