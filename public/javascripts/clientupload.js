//Written by David Itkin
//handles clientside socket logic for uploading notifications
var socket = io.connect();
function init(){
		socket.on('connect', function(data) {
		});	
}
function emit(){
	alert('Notification: File has been uploaded!');
	socket.emit('notification', {type: 'UPLOAD'});
}
