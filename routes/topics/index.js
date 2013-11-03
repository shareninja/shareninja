var models = require('../../models')
  , lib = require('../../lib')
  , NotFound = lib.NotFound
  ;


// ### *function*: index
/**
 *  Index or the main page 
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */
exports.index = function(req, res) {
  res.render('topics/index', {
    title: 'Topics',
    topics: topics
  });
};


