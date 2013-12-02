var models = require('../../models')
  , lib = require('../../lib')
  , User = models.UserModel
  ;

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
			//data = req.sessions.friendsList[w] + "<br>";
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