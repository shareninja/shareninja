var models = require('../../models')
  , lib = require('../../lib')
  , User = models.UserModel
  ;


// ### *function*: new
/**
 *  Redirects to sessions/new for loggining-in
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.new = function(req, res, next) {
  res.render('sessions/new', {
    title: 'Login'
  });
};

// ### *function*: create
/**
 *  Create a user with corresponding messages and cookies
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */
exports.create = function(req, res) {
  var condition = {
    username: req.param('username'),
    password: req.param('password')
  };
  var rememberme = req.param('rememberme');
  User.findOne(condition, function(err, result) {
    if (err) {
      return next(err);
    }
    if (!result) {
      req.flash('loginErr', 'Authentication failed');
      return res.redirect('back');
    }
    if (rememberme) {
    // Store cookie
      var newtoken = {
        username: result.username,
        authcookie: result.authcookie
      };
      lib.setCookie(res, JSON.stringify(newtoken));
    }
    req.session.username = result.username;
    res.redirect('/topics');
  });
};


// ### *function*: delete
/**
 *  Destroyes the session = logs out from the server and redirects to the sessions/new
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 */
exports.delete = function(req, res) {
  req.session.destroy();
  res.clearCookie('authtoken', { path: '/' });
  res.redirect('/sessions/new');
};
