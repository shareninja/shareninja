//Written by David Itkin - Serverside sockets code that handles all notifications type

var models = require('../models')
  , NotifModel = models.NotifModel
  ;
exports.listen = function(socket){
        socket.on('notification', function(data){
                if(data.type == 'UPLOAD'){
                        var notification = new NotifModel({
                                username: 'you',
                                type:'UPLOAD'
                        });
                        notification.save(function(err, model){
                                if(err)
                                        throw err;
                });
                }
                if(data.type == 'FRIEND'){
                        var notification = new NotifModel({
                                username: 'you',
                                type:'FRIEND'
                        });
                        notification.save(function(err, model){
                                if(err)
                                        throw err;
                        });
                }
				if(data.type == 'FORUM'){
                        var notification = new NotifModel({
                                username: 'you',
                                type:'FORUM'
                        });
                        notification.save(function(err, model){
                                if(err)
                                        throw err;
                        });
                }
        });
   };






