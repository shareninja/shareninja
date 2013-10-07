
// ### *function*: new
/**
 *  Shows 'Login' title
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.new = function(req, res, next) {
  res.render('new', {
    title: 'Login'
  });
};
