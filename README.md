# node

1、安装express

npm install express --save

2、express生成器:

http://www.expressjs.com.cn/starter/generator.html

3、自动更新

https://blog.csdn.net/twodogya/article/details/80183565

4、在routes添加中维护对外的API



5、添加文件服务管理

```
npm install md5-node --save 

var serveIndex = require('serve-index')
var serveStatic = require('serve-static');
```

6、启动

nodemon app.js

DEBUG=node:* npm start


附：

随时启用的文件服务器：https://github.com/JacksonTian/anywhere

server-index: https://github.com/expressjs/serve-index
