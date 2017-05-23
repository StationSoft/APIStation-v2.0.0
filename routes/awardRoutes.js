var express = require('express');

var routes = function(Award){
  var awardRouter = express.Router();
  
  var awardMiddleware = require('../middleware/awardMiddleware')(Award);

  awardRouter.use('/', awardMiddleware.initPayload)
    .route('/')
    .post(awardMiddleware.createAward, awardMiddleware.saveAward)
    .get(awardMiddleware.searchAward, awardMiddleware.get)
    .all(awardMiddleware.constructPayload);

  awardRouter.use('/:awardId', awardMiddleware.findAward)
    .route('/:awardId')
    .get(awardMiddleware.get)
    .put(awardMiddleware.put, awardMiddleware.saveAward)
    .patch(awardMiddleware.patch, awardMiddleware.saveAward)
    .delete(awardMiddleware.remove)
    .all(awardMiddleware.constructPayload);

  return awardRouter;
};

module.exports = routes;
