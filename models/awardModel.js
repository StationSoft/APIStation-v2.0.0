var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var awardModel = new Schema({
  period: {type: String},
  nominee: {type: String},
  team: {type: String},
  nominator: {type: String},
  reason: {type: String},
  category: {type: String},
  citation: {type: String},
  status: {type: String, default:"Proposed"}
});

module.exports = mongoose.model('Award', awardModel);
