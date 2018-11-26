/**
 * 公共脚本
 * Created by xujian on 2018/11/24.
 */
var http = require('http')
var fs = require('fs')
var process = require('child_process');
let path = require('path');
var md5 = require('md5-node');
var signKey = '!@#$%12345_%$#@!';

module.exports = {
    //下载文件
    download: function (url, path, cb) {
        var callback = function () {
            // 回调函数，避免重复调用
            callback = function () {
            };
            cb.apply(null, arguments);
        };

        var req = http.get(url, function (res) {
            var b = [];
            res.on('data', function (c) {
                b.push(c);
                console.log(url + ' downloading:' + b.length)
            });
            res.on('end', function () {
                fs.exists(path, function (exists) {
                    if (exists) {
                        console.log("正在删除已存在的文件");
                        fs.unlink(path, function (err) {
                            if (err) {
                                console.log("删除失败." + err);
                            }
                            var buffer = Buffer.concat(b);
                            fs.writeFile(path, buffer, function () {
                                console.log('删除后保存成功' + path)
                                callback(null, '');
                            });
                        })
                    } else {
                        var buffer = Buffer.concat(b);
                        fs.writeFile(path, buffer, function () {
                            console.log('保存成功.' + path)
                            callback(null, '');
                        });
                    }
                });
            });
            res.on('error', callback);
        });
        req.on('error', callback);
    },
    get: function (url, cb) {
        var callback = function () {
            // 回调函数，避免重复调用
            callback = function () {
            };
            cb.apply(null, arguments);
        };

        var req = http.get(url, function (res) {
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function () {
                callback(null, html);
            });
            res.on('error', callback);
        });
        req.on('error', callback);
    },
    process: function (cmd) {
        process.exec(cmd, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    },
    processFile: function (file, params, cb) {
        console.log('process file' + file.toString());
        process.execFile(file, params, cb);
    },
    md5: function (str) {
        var content = str + signKey;
        var encrypt = md5(content);
        //console.log('md5:' + encrypt);
        return encrypt;
    },
    mkdir: function (dir) {
        if (fs.existsSync(dir)) {
            console.log('已存在:' + dir);
            return true;
        } else {
            if (this.mkdir(path.dirname(dir))) {
                fs.mkdirSync(dir);
                return true;
            }
        }
    }
}