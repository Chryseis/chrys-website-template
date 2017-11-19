/**
 * Created by Administrator on 2017/11/19.
 */
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');


const spinner = ora('building for production...')
spinner.start()
rm(path.resolve(__dirname, `../dist/`), err => {
    if (err) throw err;

    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err;
        console.log();
        process.stdout.write(stats.toString({
                colors: true,
                displayChunks: false,
                hash: false,
                source: true,
                modules: false,
                children: false,
                chunks: false,
                progress: false,
                chunkModules: false
            }) + '\n\n');

        console.log(chalk.cyan('  打包成功.\n'))
    })
});