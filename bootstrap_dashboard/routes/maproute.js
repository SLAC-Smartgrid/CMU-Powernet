var express = require('express');
var router = express.Router();

// MongoDB wrapper
var mongo = require('../mongo');
// Used when query collection by _id field
var ObjectId = require('mongodb').ObjectID;
// Constants used in this application
var constants = require('../constants');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

//  '/' == '/homehubs' here

router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

//  '/' == '/map' here

/* GET map listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/content', function(req,res) {
  var response = [];

  mongo.query(constants.HOMEHUBS, {}, function(err, docs) {
    if(err != null) {
      internalError(res, err);
    } else {
      var index = 0;
      while(index < docs.length) {
        var homehub = docs[index];
        response.push({'hh_id': homehub._id, 'name': homehub.label,
          'total_power': homehub.total_power, 'online': 'true'});
        index++;
      }
      res.status(constants.SUCCESS).send(response);
    }
  });
});


module.exports = router;
