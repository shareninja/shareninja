//Written by David Itkin
//handles clientside socket logic for adding-friends notifications
var socket = io.connect();
function init(){
		socket.on('connect', function(data) {
		});	
}

function emit(){
	alert('Notification: Friend Requested!');
	socket.emit('notification', {type: 'FRIEND'});
}
