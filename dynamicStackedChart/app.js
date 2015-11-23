var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'data.json');

var mongo = require('mongodb').MongoClient;
var assert = require('assert');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/data', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


app.get('/hh', function(req, res) {
    
    // Connection URL
    var url = 'mongodb://localhost:27017/PowernetDB';
    // Use connect method to connect to the Server
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        
        var collection = db.collection('homehubs');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            //assert.equal(2, docs.length);
            console.log("Found the following records");
            console.dir(docs);
            
            
            res.json(docs);
            db.close(); 
        });
       
    }); 
    
 
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
