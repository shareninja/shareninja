var models = require('../../models/forum.js')
  , lib = require('../../lib')
  , Message = models.MessageModel
  ;
exports.addMessage = function(req, res, next)
{
	if(!req.body.theMsg)
	{
		return res.redirect('back');
	}
	var msg = new Message({username: req.session.username});
	msg.message = req.body.theMsg;
	msg.save(function(err, results)
	{
		if(err)
		{
			console.log("ERROR: " + err);
		}
		return res.redirect('back');
	});
}
exports.show = function(req, res, next)
{
	Message.find(function(err,messages)
	{
		messages.reverse();//shows most recent posts first
		res.render('forum/forum.ejs', {
		title: 'Forum!',
		messages: messages
		});	
	});
}
