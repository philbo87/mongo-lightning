// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var querystring = require('querystring');
var http = require('http');
var mongoose = require('mongoose');

mongoose.connect('');//TODO: Add your connection string

var LogData = require('./app/models/LogData');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next){
	//log this
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/data')
	.post(function(req, res){
    var entityId = req.body.EntityId;
    var entityType = req.body.EntityType;
    
    //Log this POST to the Database
    var logData = new LogData();
    logData.createdDate = new Date();
    logData.entityId = entityId;
    logData.entityType = entityType;
    
    logData.save(function(err){
      if(err){
        res.send(err); 
      }
      res.json({ message: 'POST Successful'});
    });
})

.get(function(req, res){
  LogData.find(function(err, logDatas){
    if(err) { res.send(err);}
    
    res.json(logDatas);
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);