var mongoose = require('mongoose');

db_name = DataStation

//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}


var db = mongoose.connect(mongodb_connection_string);
//var db = mongoose.connect('mongodb://lh7u05cg63648m2/APIStation');
//var db = mongoose.connect('mongodb://ve7d00005291/APIStation');
mongoose.Promise = global.Promise;
