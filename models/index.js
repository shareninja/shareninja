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

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authcookie: { type: String, required: true, default: getAuthCookie },
  created_at: { type: Date, default: Date.now },
  friendsList: {type: [String], default: []}, //TODO: make this required...
  friendCount: {type: Number, required: true, default: 0}
});

UserSchema.methods.setPassword = function(password, password2) {
  if (password === password2) {
    this.password = password;
    return true;
  }
  this.invalidate('password_mismatch', new Error('Password mismatched'));
  return false;
};


/*
*  Adds a friend to the user's friend list.
   TODO: make it so when a friend is added a notification is created, and the other friends the other
   TODO:  Maybe make a friend request system? Blech
*/
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
exports.UserModel = mongoose.model('User', UserSchema);

var FileSchema = new Schema({
    filename: {type: String, required: true},
    filepath: {type: String, required: true, unique: true},
    uploaded_date: {type: Date, required: true, default: Date.now}
});

var FolderSchema = new Schema({
    folder_name: {type: String, required: true},
    files: {type: [Schema.Types.ObjectId], required: true}
});
