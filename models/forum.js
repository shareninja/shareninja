var mongoose = require('mongoose')
  , utils = require('connect').utils
  ;

exports.init = function(host, db) {
  mongoose.connect('mongodb://' + host + '/' + db);
};


var Schema = mongoose.Schema
  ;

function getAuthCookie() {
  return utils.uid(32);
}

exports.getAuthCookie = getAuthCookie;

var MessageSchema = new Schema({
	username: { type: String, required: true},
	created_at: { type: Date, default: Date.now },
	text: {type: String, required: true, default: "There seems to be nothing here..."}
});

var ForumSchema = new Schema({
	groupName: {type: String, required: true},
	content: {type:[MessageSchema], default: []}//make this required and check if this works 
	});
MessageSchema.methods.newMessage = function(message)
{
	
}
/**
UserSchema.methods.setPassword = function(password, password2) {
  if (password === password2) {
    this.password = password;
    return true;
  }
  this.invalidate('password_mismatch', new Error('Password mismatched'));
  return false;
};

UserSchema.methods.addfriend = function(user){
	//first check if user being added is in database
	this.findOne({ username: user}, function(err, results){
		//TODO put error handling here
	});
	if(this.friendCount == 100)
	{
		//TODO: Too many friends, stop this from happening
	}
	friendCount++;
	this.friendsList[friendCount] = user;
}
**/
exports.UserModel = mongoose.model('Message', MessageSchema);
exports.UserModel = mongoose.model('Forum', ForumSchema);
