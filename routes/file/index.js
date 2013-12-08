/**
 * Created by Nick on 11/23/13.
 */

var path = require('path'),
	models = require('../../models'),
	File = models.FileModel,
	Folder = models.FolderModel,
	User = models.UserModel
	;

exports.download = function(req, res){
	var filename = req.params.file;
	console.log(filename);
	File.findOne({filename: filename}, function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			console.log(result);
			var name = result.filename;
			var abspath = result.filepath;
			var base = path.basename(abspath);
			var dir = {root : path.dirname(abspath)};
			var id = result._id;
			res.attachment(name);
			res.sendfile(base, dir);
		}else{
			console.log('file not found...');
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
	var file = new File({
		filename : name,
		filepath : path
	});
	file.save(function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			console.log('file saved');
			//console.log(result);
		}
	});
	res.redirect('/upload');
};

exports.folder = function(req, res){
	var username = req.session.username;
	User.findOne({username: username}, function(err, result){
		if(err){
			console.log(err);
		}
		if(result){
			console.log('user found');
			var folders = result.folders;
			console.log(folders);
		}else{
			console.log('user not found');
		}
	});
};