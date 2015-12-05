var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

/**
 * Routes
 *
 */
var homehubs = require('./routes/homehubs.js');
var hhstatus = require('./routes/hhstatus.js');
var maproute = require('./routes/maproute.js');
app.use('/homehubs', homehubs);
app.use('/hhstatus', hhstatus);
app.use('/map', maproute);

/**
 * Test data files
 */

var DATA_FILE = path.join(__dirname, '/public/data.json');
var OLD_DATA_FILE = path.join(__dirname, '/public/data_initial.json');
var HHSTATUS_FILE = path.join(__dirname, '/public/HHStatusData.json');


// MongoDB wrapper
var mongo = require('./mongo');
// Used when query collection by _id field
var ObjectId = require('mongodb').ObjectID;
// Constants used in this application
var constants = require('./constants');

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/pages/hh/:hhid', function (req, res) {
  res.render('index', {name : 'jay'});
});

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});


/**
* Helper function to return internal error message
* to the web client.
* @param res - The Http Response object
* @param err - The error object
* @return void
*/
function internalError(res, err) {
  console.warn(err);
  res.status(constants.INTERNAL_ERROR).send('Internal Error');
}
app.get('/api/data', function(req, res) {

  fs.readFile(OLD_DATA_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(3000);
mongo.init(function() {
  app.listen(3000, function() {
    console.log("Node app is running at localhost:" + 3000)
  })
})
//module.exports = app;
