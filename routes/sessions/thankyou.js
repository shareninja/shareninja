// ### *function*: show
/**
 *  Redirects to thank you page
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.show = function(req, res, next) {
  res.render('sessions/thankyou', {
    title: 'Thank you'
  });
};
