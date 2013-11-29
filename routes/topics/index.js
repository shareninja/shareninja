// ### *function*: index
/**
 *  Index or the main page 
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */
exports.show = function(req, res) {
  res.render('topics/index', {
    title: 'Index'
  });
};


