var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var serveIndex = require('serve-index')
var serveStatic = require('serve-static');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//目录列表及静态文件下载
app.get("/", function(req, res){
    res.redirect(302, "/qtt"); //test direct;
});
app.use('/qtt', serveIndex('/Users/xujian/Self/node/qtt', {'icons': true})) //This is Mac OS fs path;
var serve = serveStatic('/Users/xujian/Self/node/qtt')
app.get('/qtt/*', function(req, res){
    req.url = req.url.substring(4); //跳过url中的/f前缀，把剩余的部分映射为相对于/home/chenzx的文件路径
    console.info("["+req.request_id+"] GET static "+req.url);
    serve(req, res)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//自动更新
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口
//启动监听
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

//module.exports = app;//这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来
