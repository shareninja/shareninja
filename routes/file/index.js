/**
 * Created by Nick on 11/23/13.
 */
/**
 * Author: Nicholas Hirakawa
 * This file holds most of the logic for uploading and downloading
 * files. The file schema can be found in /models/index.js
 */

var path = require('path'),
	models = require('../../models'),
	File = models.FileModel,
	User = models.UserModel
	;

exports.download = function(req, res){
	var filename = req.params.file; //name of the file
	var username = req.session.username; //current user
	User.find({username : username}, function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			console.log('found user');
			console.log(result);
			var files = result[0].files;
			console.log(files);
			var f = null;
			for(var i = 0; i < files.length; i++){
				if(files[i].filename == filename){ //find file with filename
					f = files[i];
				}
			}
            // for express 2
			var base = path.basename(f.filepath);
			var dir = {root : path.dirname(f.filepath)};
			res.attachment(f.filename); //give download the proper filename
			res.sendfile(base, dir);
		}else{
			console.log('file not found');
		}
	});
};

exports.upload = function(req, res){
	res.render('file/upload', {title: 'Upload'});
};

exports.post = function(req, res){
	var f = req.files.user_file;
	var path = f.path;
	var name = f.name;
	var username = req.session.username; //current user
	var file = new File({
		filename : name,
		filepath : path
	});
	User.update({username : username},
		{$addToSet : {files : file}}, //prevent multiple copies of same file
		function(err, result){
			if(err){
				console.log(err);
			}
			if(result){
				console.log(result);
			}
		});
	res.redirect('/upload');
};

