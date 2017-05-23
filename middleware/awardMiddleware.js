var awardMiddleware = function(Award){

  var initPayload = function(req, res, next){
    res.locals = {
      statusCode: 200,
      message: '',
      data: {}
    };
    next();
  };

  var findAward = function(req, res, next){
    Award.findById(req.params.awardId, function(err, award){
      if(err) {
        res.locals.statusCode = 500;
        res.locals.message = err;
      } else if(!award) {
        res.locals.statusCode = 404;
        res.locals.message = 'no award found';
      } else {
        req.award = award;
      }

      next();
    })
  };

  var searchAward = function(req, res, next){
    var query={};

    if (req.query.period)
      query.period = req.query.period;
    if (req.query.nominee)
      query.nominee = req.query.nominee;

    Award.find(query, function(err, awards){

      if(err) {
        res.locals.statusCode = 500;
        res.locals.message = err;
      } else if(awards.length == 0) {
        res.locals.statusCode = 404;
        res.locals.message = 'no award found';
      } else {
        req.award = awards;
      }

      next();
    });
  };

  var createAward = function(req, res, next){
    var validationPassed = true;
    if(!req.body.period){
      res.locals.statusCode = 400;
      res.locals.message += ' : Period Required';
      validationPassed = false;
    }

    if(!req.body.nominee){
      res.locals.statusCode = 400;
      res.locals.message += ' : Nominee Required';
      validationPassed = false;
    }

    if(validationPassed) {
      var award = new Award(req.body);
      req.award = award;
    }

    next();
  };

  var saveAward = function(req, res, next){
    if (res.locals.statusCode == 200){
      req.award.save(function(err){
        if(err) {
          res.locals.statusCode = 500;
          res.locals.message = err;
        } else {
          res.locals.statusCode = 201;
          res.locals.data = req.award;
        }
        next();
      });
    } else {
      next();
    }
  };

  var get = function(req, res, next){
    if(res.locals.statusCode == 200)
      res.locals.data = req.award;

    next();
  };

  var put = function(req, res, next){
    req.award.period = req.body.period;
    req.award.nominee = req.body.nominee;
    req.award.team = req.body.team;
    req.award.nominator = req.body.nominator;
    req.award.reason = req.body.reason;
    req.award.category = req.body.category;
    req.award.citation = req.body.citation;
    req.award.status = req.body.status;
  /*
    if(req.body._id)
      delete req.body._id;
    for (var p in req.award)
    {
      if(!req.award.__v) // How do I exclude mongodb's __v and loop through?
        req.award[p] = req.body[p];
    }
  */

    next();
  };

  var patch = function(req, res, next){
  //    if(req.body._id)
  //      delete req.body._id;
    for (var p in req.body){
      if(req.body[p] != req.body._id)
        req.award[p] = req.body[p];
    };

    next();
  };

  var remove = function(req, res, next){
    if (res.locals.statusCode == 200){
      req.award.remove(function(err){
        if(err) {
          res.locals.statusCode = 500;
          res.locals.message = err;
        } else {
          res.locals.statusCode = 200;
          res.locals.message = 'Removed';
        }
        next();
      });
    } else {
      next();
    }
  };

  var constructPayload = function(req, res, next){
    res.status(res.locals.statusCode);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    if (res.locals.message) {
      res.send(res.locals.message)
    } else {
      res.json(res.locals.data);
    }

    next();
  };

  var actions = {
    initPayload: initPayload
    , findAward: findAward
    , searchAward: searchAward
    , createAward: createAward
    , saveAward: saveAward
    , get: get
    , put: put
    , patch: patch
    , remove: remove
    , constructPayload: constructPayload
  };

  return actions
}

module.exports = awardMiddleware;
