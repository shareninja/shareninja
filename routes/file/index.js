/**
 * Created by Nick on 11/23/13.
 */

var path = require('path'),
	models = require('../../models'),
	File = models.FileModel,
	User = models.UserModel
	;

exports.download = function(req, res){
	var filename = req.params.file;
	var username = req.session.username;
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
				if(files[i].filename == filename){
					f = files[i];
				}
			}
			var base = path.basename(f.filepath);
			var dir = {root : path.dirname(f.filepath)};
			res.attachment(f.filename);
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
	console.log('path: ', path);
	console.log('name: ', name);
	var username = req.session.username;
	console.log(username);
	var file = new File({
		filename : name,
		filepath : path
	});
	User.update({username : username},
		{$push : {files : file}},
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

exports.test = function(req, res){
	var user = req.session.username;
	User.findOne({username : user}, function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			console.log('files: ' , result.files);
		}
	});
};
