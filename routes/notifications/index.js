var models = require('../../models')
  , lib = require('../../lib')
  , NotifModel = models.NotifModel
  ;

/*### *function*: show
*@param {object} req The HTTP request
*@param {object} res The HTTP response
*/

exports.show = function(req, res) {
  res.render('notifications/display', {
    title: 'Notifications',
	Notifications: NotifModel.find({})
	
	});
};




