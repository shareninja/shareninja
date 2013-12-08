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
  friendsList: [{type: String}],
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
	/**
	if(this.friendCount == 100)
	{
		console.log("ERROR:  Cannot add any more friends to user " + this.username);
	}
	*/
	//console.log("DEBUG: Running last two lines");
	this.friendCount++;
	//this.friendsList[this.friendCount] = user;
	this.friendsList.push(user);
	//this.update({friendsList: this.friendsList});
}
exports.UserModel = mongoose.model('User', UserSchema);

var FileSchema = new Schema({
    filename: {type: String, required: true},
    filepath: {type: String, required: true, unique: true},
    uploaded_date: {type: Date, required: true, default: Date.now}
});

exports.FileModel = mongoose.model('File', FileSchema);

var FolderSchema = new Schema({
    folder_name: {type: String, required: true},
    files: {type: [Schema.Types.ObjectId], required: true}
});


var NotificationSchema = new Schema({
  type: { type: String, required: true },
  username: { type: String, required: true}, 
  friend: { type: String, required: true },
  group: { type: String },
  created_at: { type: Date, required: true, default: Date.now }
});

NotificationSchema.methods.clear = function(){};

exports.NotifModel = mongoose.model('Notification', NotificationSchema);


