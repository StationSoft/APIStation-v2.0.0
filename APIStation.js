var express = require('express'),
    bodyParser = require('body-parser');

require('./database');

var APIStation = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

APIStation.disable('x-powered-by');

APIStation.use(bodyParser.urlencoded({extended:true}));
APIStation.use(bodyParser.json());

// API Station's Home
APIStation.get('/', function(req, res){
  res.send('Welcome to API Station Home!');
});

// API modules that attach themselves to API Station
require('./API/BravoNomination')(APIStation);

// Start Listener
APIStation.listen(port, function(){
  console.log('Gulp running API Station on port: ' + port);
});
