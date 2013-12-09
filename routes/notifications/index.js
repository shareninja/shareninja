var models = require('../../models')
  , lib = require('../../lib')
  , NotifModel = models.NotifModel
  ;

/*### *function*: show
*@param {object} req The HTTP request
*@param {object} res The HTTP response
*/

exports.show = function(req, res) {
  NotifModel.find({username:'dave'}, function(err, docs){
		if (err)
			throw err;	
  res.render('notifications/display', {
    title: 'Notifications',
	Notifications: docs
	});
}); 
};

exports.listen = function(socket){
	socket.on('notification', function(data){ 
		if(data.type == 'UPLOAD'){
			var notification = new NotifModel({
				username: 'dave',
				type:'UPLOAD',
			});
			notification.save(function(err, model){
				if(err)
					throw err;
		});
		}
		if(data.type == 'FRIEND'){
			var notification = new NotifModel({
				username: 'dave',
				type:'FRIEND',
			});
			notification.save(function(err, model){
				if(err)
					throw err;
			});
		}
	});
	};




