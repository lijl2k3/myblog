var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var routes = require('./routes/index');
var users = require('./routes/users');
var articles=require('./routes/articles');
var app = express();
require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles',articles);

// catch 404 and forward to error handler ����404���󣬲�ת��������������
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers ��������

// development error handler ���������µĴ�����
// will print stacktrace ����ӡ����ջ��Ϣ
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler ���������µĴ�����
// no stacktraces leaked to user �����û���¶��ջ��Ϣ
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
  resave:true,
  saveUninitialized:true,
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port,
  })
}));

var flash = require('connect-flash');
app.use(flash());
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

module.exports = app;