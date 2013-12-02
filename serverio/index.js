exports.notify = function(socket){
	 console.log('A new user connected!');
	 socket.on('notify', function(data){
		socket.emit('notify', { type : data });
	});
};





