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
<<<<<<< HEAD
	})
=======
	// })
>>>>>>> 6ecc2e428f4de96ffb127ff80becf973be08f2a8
	res.render('userSearch/userSearch', {
    title: 'Add a friend'
  });
}
