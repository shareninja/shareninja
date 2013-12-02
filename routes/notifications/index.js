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
	Notifications: ['Paika Uploaded a File! - 10:30PM 12/2','Nick Added you as a Friend! - 11:23AM 12/1', 'Emily Added you as a Friend! - 10:22AM 12/1']
	
	});
};




