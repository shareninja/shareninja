//Written by David Itkin, route Handler for Notifications Page

var models = require('../../models')
  , lib = require('../../lib')
  , NotifModel = models.NotifModel
  ;

exports.show = function(req, res) {
  NotifModel.find({username:'you'}, function(err, docs){
		if (err)
			throw err;	
  res.render('notifications/display', {
    title: 'Notifications',
	Notifications: docs
	});
}); 
};






