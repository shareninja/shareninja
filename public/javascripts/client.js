// connect to the socket server

var socket = io.connect();

socket.on('notify', function (data) {
	console.log(data);
	socket.emit('reply', {data:'yo'});
});
