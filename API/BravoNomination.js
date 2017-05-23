// Models of resources served by the API
var Award = require('../models/awardModel');

// Routes Modules
var awardRouter = require('../routes/awardRoutes')(Award);

// Attach API's resources' base URI and the router to API Station
var BravoNomination = function(APIStation){
  APIStation.use('/BravoNomination/Awards', awardRouter);

  // API's Home
  APIStation.get('/BravoNomination', function(req, res){
    res.send('Welcome to Bravo Nomination API!');
  });
}

module.exports = BravoNomination;
