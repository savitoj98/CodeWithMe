var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require("cors");
var Request = require('request');

var index = require('./routes/index');
var rooms = require('./routes/rooms');
var generate = require('./generate-room');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());




// app.post('/enter_room', function (req, res, next) {
//   //console.log(req);
//   var room_id = generate.generateRoom();
//   //res.status(200).send(room_id);
//   res.redirect('/rooms/' + room_id);
// });

app.get('/new_room', (req,res,next) => {
    var room_id = generate.generateRoom()
    res.status(200).send(room_id)
})

app.post('/run', function (req, res) {
  
  var data;
  
  new Promise(function(resolve, reject){
    
    Request.post({
      url: 'https://api.judge0.com/submissions?wait=true',
      body: JSON.stringify(req.body),
      headers: {'content-type': 'application/json'},
    }, function (error, response, body) {
      if (error) {
        console.log(error);
        resolve();
      }
        console.log('body',body);
        data = body;
        resolve();
    });
  }).then(function(){
    res.send(data);
  });
  
  // console.log(data);
  
});

// app.use('/', index);
// app.use('/rooms/:id', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
