var models = require('../../models')
  , lib = require('../../lib')
  , User = models.UserModel
  ;

exports.show = function(req, res, next)
{
	//test case remove once debugged
	//console.log("START OF TEST DATA");
	//User.find(function (err, users) {
	//console.log(users);
	//console.log("END OF TEST DATA");
	// })
	res.render('userSearch/userSearch', {
    title: 'Add a friend'
  });
}
