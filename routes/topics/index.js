// ### *function*: index
/**
 *  Index or the main page 
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */

var models = require('../../models'),
	User = models.UserModel;
exports.show = function(req, res) {
	console.log('retrieving files');
	var username = req.session.username;
	User.findOne({username : username}, function(err, result){
		if(err){
			console.log(err);
			res.end();
		}
		if(result){
			console.log('found files');
			var files = result.files;
			console.log('files: ', files);
			res.render('topics/index', {
				title : 'Index',
				files : files
			});
		}else{
			res.render('topics/index', {
				title: 'Index',
				files : null
			});
		}
	});
};


