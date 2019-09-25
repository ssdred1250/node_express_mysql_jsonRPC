var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var proposalRouter = require('./app_server/routes/proposal');
var prepRouter = require('./app_server/routes/prep');
var stakeRouter = require('./app_server/routes/stake');
var delegationRouter = require('./app_server/routes/delegation');

var app = express();

const models = require("./app_server/models/index.js");

const methodOverride = require('method-override');

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/proposal', proposalRouter);
app.use('/prep', prepRouter);
app.use('/stake', stakeRouter);
app.use('/delegation', delegationRouter);
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

module.exports = app;
