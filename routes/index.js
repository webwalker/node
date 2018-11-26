var express = require('express');
var fs = require('fs')
let path = require('path');
var router = express.Router();

var util = require('./../public/js/common.js')
const dep_path = '/Users/xujian/Downloads/dependencies/';
const sh_path = '/Users/xujian/Self/node/';

//主页
// router.get('/', function(req, res) {
//   // res.render('index', { title: 'Express' });
//     res.render(list())
// });

//创建组件
router.get('/api/createCompontent', function (req, res) {
    console.log(req.query);
    // util.processFile('/Users/xujian/Self/node/dependencies.sh', ['--a --b --c'], function (error, stdout, stderr) {
    //     if (error !== null) {
    //         console.error('exec error: ' + error);
    //         throw error;
    //     }
    //     console.log(stdout);
    // });

    util.get('http://www.baidu.com', function (err, resp) {
        if (err) throw err;
        console.log('over.')
    });

    res.send(200);
});

//保存依赖文件
//参数：file采用
router.get('/api/saveDependencies', function (req, res) {
    console.log('\r\nrequest url:' + req.url);

    var file = req.query.file;
    var md5 = req.query.md5;
    var name = req.query.name;
    if (!file || !md5 || !name) {
        console.log('请求非法.');
        onResponse(false);
        res.send(403);
        return;
    }

    var currentMd5 = util.md5(file);
    console.log('current md5:' + currentMd5 + ', md5:' + md5);
    if (currentMd5 === md5) {
        console.log('文件地址校验通过:' + file);
        var filePath = dep_path + name + '/';
        //递归创建目录
        util.mkdir(filePath);
        //下载文件
        var fileName = path.basename(file);
        var fullName = filePath + fileName;
        console.log('download save path:' + fullName);
        util.download(file, fullName, function (err, buffer) {
            if (err) {
                console.log(err);
            } else {
                onResponse(true);
                //异步提交到git仓库
                util.processFile(sh_path + 'dependencies.sh', [fileName], function (error, stdout, stderr) {
                    if (error !== null) {
                        console.error('exec error: ' + error);
                        onResponse(false);
                    }
                    console.log(stdout);
                    onResponse(true);
                });
            }
        });
    } else {
        console.log('文件地址验证未通过.');
        res.send(403);
        return;
    }
    res.send(200);
});

function onResponse(ret) {
    console.log('onResponse:' + ret)
    if (ret) {

    } else {

    }
}

module.exports = router;
