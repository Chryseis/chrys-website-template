/**
 * Created by Administrator on 2017/11/19.
 */
const fs = require('fs');
const path = require('path');
const glob=require('glob');

console.log(process.cwd());

console.log(path.resolve(__dirname, 'src'))

let fileArr = fs.readdirSync(path.resolve(__dirname, 'src'));

fileArr.forEach((item, i) => {
    console.log(fs.statSync(path.resolve(__dirname, 'src', item)).isDirectory());
})


function getAllEntrys() {
    let entrys = {};
    let dir = path.resolve(__dirname, 'src');
    let directoryArr = fs.readdirSync(dir);
    directoryArr.forEach((item, i) => {
        if (fs.statSync(path.join(dir, item)).isDirectory()) {
            let fileArr = fs.readdirSync(path.join(dir, item));
            fileArr.forEach((file, i) => {
                if (!fs.statSync(path.join(dir, item, file)).isDirectory()) {
                    entrys[item]
                }
            })
        }
    })
}

console.log(fileArr)