jQuery(function($) {
	"use strict";
	var socket = io.connect('http://'+location.host + '/');
	// When receives create-button behavior, sends the event 'create'  
	$('#create-button').click(function(){
		var note = {
			text:''
		};
		socket.emit('create',note);
	});
	// When receives the event 'create', generates the StickyNotes
	var createStickyNotes = function(note){
		var id = stickyNotes._id;
		// var old = $('#'+id);
		// if(old.length !== 0){
		// 	return;
		// }
		
		var data =
			$('<div class="stickyNotes"/>')
			.attr('id',id)
			.append($('<div class="settings">')
				.append('<a href="#" class="remove-button">☓</a>')
			)
			.append($('<div/>')
				.append($('<textarea class="text"/>')
					.val(memoData.text)
				)
			);
		data.hide().fadeIn();
		$('#field').append(element);
		//☓ボタンを押した場合removeイベントを送る
		data.find('.remove-button').click(function(){
			socket.emit('remove',{_id:id});
			removeStickyNotes(id);
			return false;
		});
	};
	// When receives the event 'remove', deletes the StickyNotes
	var removeStickyNotes = function(id){
		$('#'+id).fadeOut('fast').queue(function(){
			$(this).remove();
		});
	};
	//When receives the event 'create', adds StickyNotes on html
	socket.on('create',function(notes){
		createStickyNotes(notes);
	});
	// Deletes StickyNotes from the database when receiving the event 'remove'
	socket.on('remove',function(data){
		removeMemo(data._id);
	});
});