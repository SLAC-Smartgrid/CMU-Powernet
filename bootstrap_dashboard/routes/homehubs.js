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


/* GET homehubs listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

/**
* REST APIs for other routerlications to feed/retrieve homehub
* status
*/

/**
*  Register a new homehub to the cloud controller. Return the uuid of
*  the new homehub. If X-OpenBMS-Hub available, it should be the uuid
*  of the homehub, and the data is updated.
*
*/
router.post('/', function(req, res) {
  // It is the update case
  if(constants.X_UPDATE_HUB in req.headers) {
    console.log('Update');

    mongo.update(constants.HOMEHUBS, {'_id': new ObjectId(req.headers[constants.X_UPDATE_HUB])},
    {$set: req.body}, function(err, result) {
      if(err != null) {
        internalError(res, err);
      } else {
        res.status(constants.SUCCESS).send('');
      }
    });
  } else {
    // It is the registration case
    console.log('Registration');

    var homehub = req.body;

    mongo.insertOne(constants.HOMEHUBS, homehub, function (err, result) {
    if(err != null) {
      internalError(res, err);
    } else {
      res.status(constants.SUCCESS).send({'uuid' : homehub._id});
    }});
  }
});

/**
*  Send Homehub status to CC whenever there is status update
*/
router.patch('/:id', function(req, res) {
  var status = req.body;
  status.uuid = req.params.id;
  status.timestamp = new Date().getTime();

  mongo.query(constants.HOMEHUBS, {'_id': new ObjectId(status.uuid)},
    function(err, docs) {
      if(err != null) {
        internalError(res, err);
      } else {
        /*if(docs.length == 1) {
          var state = docs[0].state;
          for(id in state) {
            if(!(id in status.state)) {
              status.state[id] = state[id];
            }
          }
        }*/

        mongo.insertOne(constants.HHSTATUS, status,
          function(err, result) {
            if(err != null) {
              internalError(res, err);
            }
            delete status._id;
            mongo.update(constants.HOMEHUBS, {'_id': new ObjectId(status.uuid)},
              {$set: status}, function(err, result) {
                if(err != null) {
                  internalError(res, err);
                } else {
                  res.status(constants.SUCCESS).send('');
                }
              });
          });
      }
  });
});

/**
* List all the Homehubs
*/
router.get('/', function(req, res) {
  
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

/**
* Retrieve the price aggregation data
*/
router.get('/aggregation/:timestamp', function(req, res) {
  var currentTime = new Date().getTime();
  var timestamp = currentTime - req.params.timestamp * 60 * 1000;
  
  mongo.query(constants.HOMEHUBS, {}, function (err, docs){
    if(err != null) {
      internalError(res, err);
    } else {
      var response = [];
      var names = {};
      var latestPower = {};
      var ids = [];
      var history = {};

      // Retrieve all existing HomeHubs
      var index = 0;
      while(index < docs.length) {
        var id = ''+docs[index]._id;
        ids.push(id);
        names[id] = docs[index].label;
        latestPower[id] = [docs[index]['total_power']];
        history[id] = {};
        history[id]['key'] = names[id];
        history[id]['values'] = [];
        index++;
      }

      if(ids.length == 0) {
        res.status(constants.SUCCESS).send(response);
        return;
      }

      // Retrieve the history data
      var recordCounter = 0;
      mongo.query(constants.HHSTATUS, {'uuid' :{$in: ids}, 'timestamp' : {$gt: timestamp}},
        function(e, records) {
          //console.log(records);
          if(e != null) {
            internalError(res, e);
            return;
          } else {
            var record;
            index = 0;
            while(index < records.length) {
              record = records[index];
              history[record.uuid]['values'].push([record['timestamp'], record['total_power']]);
              index++;
            }
          }
          // Get the max record count
          for(key in history) {
            recordCounter = Math.max(recordCounter, history[key]['values'].length);
          }

           // We should include the first and last record to make the figure pretty.
          recordCounter += 2;
          for(key in history) {
            //console.log('key -> ' + key);
            var expectedCounter = recordCounter - 1;
            if(history[key]['values'].length == 0) {
              history[key]['values'].push([timestamp, latestPower[key]]);
            } else { 
              history[key]['values'].unshift([timestamp, history[key]['values'][0][1]]);
            }
            while(expectedCounter > 0) {
              history[key]['values'].push([currentTime, latestPower[key]]);
              expectedCounter--;
            }
            response.push(history[key]);
          }
          console.log('');
          //console.log(JSON.stringify(response));
          console.log('');
          res.status(constants.SUCCESS).send(JSON.stringify(response));
        });
    }
  });
});


module.exports = router;
