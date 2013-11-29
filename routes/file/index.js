/**
 * Created by Nick on 11/23/13.
 */

exports.download = function(req, res){
	console.log(req.params.file);
	res.end();
};

exports.upload = function(req, res){
	res.render('file/upload', {title: 'Upload'});
};

exports.post = function(req, res){
	var f = req.files.user_file;
	console.log(f);
	res.end();
};