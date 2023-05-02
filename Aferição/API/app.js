var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoDB='mongodb://127.0.0.1/EMD';
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,"MongoDB connection error ..."));
db.once('open',function(){
  console.log('Conexão ao MongoDB realizada com sucesso ...')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
