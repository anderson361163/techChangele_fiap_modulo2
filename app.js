var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { create } = require('express-handlebars');
//const mysql = require('mysql');

var indexRouter = require('./routes/index');
var alunoRouter = require('./routes/aluno');
var professorRouter = require('./routes/professor');

var app = express();

// Configuração do Handlebars
const hbs = create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'), // Diretório para os layouts
  defaultLayout: 'layout', // Layout padrão
  partialsDir: path.join(__dirname, 'views/partials') // Diretório para os partials
});

app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/', alunoRouter);
app.use('/professor', professorRouter);

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