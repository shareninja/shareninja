var models = require('../../models')
  , lib = require('../../lib')
  , NotifModel = models.NotifModel
  ;

/*### *function*: show
*@param {object} req The HTTP request
*@param {object} res The HTTP response
*/

exports.show = function(req, res) {
  var notifs = new Array();
  NotifModel.find({username:'dave'}, function(err, docs){
		if (err)
			throw err;
		for (i=0;i<docs.length;i++)
			notifs.push(docs[i]);
	}); 
  res.render('notifications/display', {
    title: 'Notifications',
	Notifications: notifs
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
			socket.broadcast.emit('notifyknow',{NOTIFICATION: 'NOTIFICATION SENT!'});
			socket.emit('notifyknow',{NOTIFICATION: 'NOTIFICATION SENT!'});
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




