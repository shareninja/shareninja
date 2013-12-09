var mongoose = require('mongoose')
  , utils = require('connect').utils
  ;

exports.init = function(host, db) {
  mongoose.connect('mongodb://' + host + '/' + db);
};

var Schema = mongoose.Schema;

function getAuthCookie() {
  return utils.uid(32);
}

exports.getAuthCookie = getAuthCookie;

var MessageSchema = new Schema({
	username: { type: String},
	date: { type: Date, default: Date.now },
	message: {type: String, default: "There seems to be nothing here..."}
});

exports.MessageModel = mongoose.model('Message', MessageSchema);
