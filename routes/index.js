// ### *function*: index
/**
 *  Redirects to top, which is topics (menu)
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */

exports.index = function(req, res, next){
  res.redirect('topics');
};