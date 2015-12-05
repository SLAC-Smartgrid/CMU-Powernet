var express = require('express');
var router = express.Router();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));



//  '/' == '/hhstatus' here

// MongoDB wrapper
var mongo = require('../mongo');
// Used when query collection by _id field
var ObjectId = require('mongodb').ObjectID;
// Constants used in this application
var constants = require('../constants');


/* GET hhstatus listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hhstatusstatic', function(req,res) {
  fs.readFile(HHSTATUS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    res.json(JSON.parse(data));
  });
});


module.exports = router;
