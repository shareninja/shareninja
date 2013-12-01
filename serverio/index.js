exports.notify = function(socket){
	 console.log('A new user connected!');
	 socket.emit('notify', {notification : 'notification type' });
	socket.on('reply', function(data){
		console.log(data);
		});
};





