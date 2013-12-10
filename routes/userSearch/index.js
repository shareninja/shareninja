var util = require('util')
	, fs = require('fs')
	, models = require('../../models')
	, User = models.UserModel
	;
/*
 Thoughts: Is the error happening because of redis?

 Process:  Got it to work!
 */
//Current Goal: Display a user's friends list
var displayFriends = function(req, res, next)
{
	User.findOne({username: req.session.username}, function(err,user)
	{
		console.log("DEBUG: IMPORTANT " + user);
		messages = user.friendsList;
		res.render('userSearch/userSearch.ejs', {
			title: 'Friends page!',
			messages: messages
		});
	});
}
var dispDB = function()
{
	User.find(function(err, data)
	{
		console.log("DEBUG: " + data);
	});
}
exports.addFriend = function(req, res, next)
{
	//dispDB();
	console.log("DEBUG: Adding a friend");
	var username = req.param('username');
	User.findOne({username : req.session.username}, function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			User.update({username : username}, {$addToSet : {friendsList: result._id}}, function(err, result){
				if(err){
					console.log(err);
				}
				if(result){
					User.findOne({username : username}, function(err, result){
						if(result){
							console.log('your friends list: ', result.friendsList);
						}
					});
				}
			});
		}
	});
//	var query = User.where({username : username});
//	query.findOne(function(err, result)
//	{
//		var temp = result.friendsList;
//		temp.push(req.body.theFriend);
//		User.update({_id: req.session._id}, {friendsList: temp},function(err, numberAffected, raw)
//		{
//			if(err)
//			{
//				console.log("ERROR: " + err);
//			}
//			console.log("DEBUG: Number affected " + numberAffected);
//			dispDB();
//			return res.redirect('back');
//		});
//	});
}

exports.show = function(req, res, next)
{
	displayFriends(req,res,next);
}
/*
 exports.show = function(req, res, next)
 {
 dispDB();
 var query = User.where({_id: req.session._id});
 var condition = {
 _id: req.session._id
 };
 query.findOne(function(err, result) 
 {
 console.log("DEBUG: Value of result: " + result);
 console.log("DEBUG: Value of username: " + result.username);
 console.log("DEBUG: Value of username cookie: " + req.session.username);
 var friends = result.friendsList;
 User.remove({username: result.username}, function(err, removed)
 {
 console.log("DEBUG: removed, now adding in...");
 if (removed === 0)
 {
 // When nothing has deleted
 console.log("ERROR: Nothing was deleted");
 }
 //Edit user before returning
 //result.friendCount = result.friendCount + 1;
 user = new User({username: result.username});
 user.password = "temp";//CHANGE THIS
 user.save(function(err, completed)
 {
 if (err)
 {
 console.log("ERROR:  Error saving a new user to MongoDB");
 console.log(err);
 }
 console.log("DEBUG: completed object after it was saved:" + completed);
 req.session.username = user.username;
 dispDB();
 });
 });
 show(req,res,next);
 });
 };
 /*
 exports.show = function(req, res, next)
 {
 req.session.friendsList = ["ChrisPaika"];
 User.find(function(err, users)
 {
 for(w in users)
 {
 console.log(users[w].username);
 req.session.friendsList.push("Hey");
 //data = req.sessions.friendsList[w] + "
 ";
 }
 });
 console.log("FRIENDS LIST: " + req.session.friendsList.length);
 var data = "Current friends:";
 for(i in req.session.friendsList)
 {
 data = data + req.session.friendsList[i] + ","
 }
 console.log("DEBUG: " + data);
 var interior = data;
 res.render('userSearch/userSearch.ejs', {title: interior});
 }
 */
/*
 exports.show = function(req, res, next)
 {
 if(req.session.friendsList == undefined)
 {
 req.session.friendsList = ["","","",""];
 }
 console.log("FRIENDS LIST: " + req.session.friendsList);
 var data = "";
 for(i in req.session.friendsList)
 {
 data = data + req.session.friendsList[i] + "\r\n";
 }
 console.log("DEBUG: " + data);
 var interior = data;
 res.render('userSearch/userSearch.ejs', {title: interior});
 }
 */