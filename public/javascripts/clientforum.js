//Written by David Itkin
//handles clientside socket logic for forum posting notifications
var socket = io.connect();
function init(){
		socket.on('connect', function(data) {
		});	
}

function emit(){
	alert('Notification: Forum Post!');
	socket.emit('notification', {type: 'FORUM'});
}
