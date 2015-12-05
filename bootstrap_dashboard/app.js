var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pages/hh/:hhid', function (req, res) {
  res.render('index', {name : 'jay'});
});

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});


/**
* REST APIs for other applications to feed/retrieve homehub
* status
*/

/**
*  Register a new homehub to the cloud controller. Return the uuid of
*  the new homehub. If X-OpenBMS-Hub available, it should be the uuid
*  of the homehub, and the data is updated.
*
*/
app.post('/api/v1/homehubs', function(req, res) {
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

    console.log(req.body);
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
app.patch('/api/v1/homehubs/:id', function(req, res) {
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
app.get('/api/v1/homehubs', function(req, res) {
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
app.get('/api/v1/homehubs/aggregation/:timestamp', function(req, res) {
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
          console.log(JSON.stringify(response));
          console.log('');
          res.status(constants.SUCCESS).send(JSON.stringify(response));
        });
    }
  });
});

app.get('/api/aggregate_price', function(req, res) {

  var rnum
  var tsNow = Date.now();

  fs.readFile(DATA_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var price_histories = JSON.parse(data);

    for (var i = 0; i < price_histories.length; i++){
        rnum = Math.round(Math.random(0, 81)*100);
        price_histories[i].values.push([tsNow, rnum]);

    }

    fs.writeFile(DATA_FILE, JSON.stringify(price_histories), function(err, data2){
        if (err) {
            console.error(err);
            process.exit(1);
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.json(price_histories);

    });

  });
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

app.get('/api/hhstatusstatic', function(req,res) {
  fs.readFile(HHSTATUS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }
    res.json(JSON.parse(data));
  });
});

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

    fs.writeFile(DATA_FILE, JSON.stringify([{"key":"Slac","values":[]}, {"key":"CMU sv", "values":[]}, {"key":"Yizhe Home","values":[]},{"key": "Cory Home", "values":[]}]), function(err, data2){
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log('Rewrote ' + DATA_FILE);
    });
    console.log("Node app is running at localhost:" + 3000)
  })
})
//module.exports = app;
