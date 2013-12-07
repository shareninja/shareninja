//Written by David Itkin
//handles clientside socket logic for uploading notifications
function onload(){
		var socket = io.connect();
		
		socket.on('connect', function(data) {
			alert('yea');
			socket.emit('reply', {type:'UPLOAD'});
		});
		
		socket.on('notifyknow', function (data) {
			alert(data.notification);
		});
};
