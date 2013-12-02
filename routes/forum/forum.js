var models = require('../../models/forum.js')
  , lib = require('../../lib')
  , User = models.UserModel
  ;
	
exports.show = function(req, res, next)
{
	res.render('forum/forum.ejs', {
	title: "here's the forum!"});	
}