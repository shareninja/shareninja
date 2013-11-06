var models = require('../../models')
  , lib = require('../../lib')
  , User = models.UserModel
  ;


// ### *function*: create
/**
 *  Create a new user with a username, password, confirmation password, and a cookie
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.create = function(req, res, next) {
  var username = req.param('username')
    , password = req.param('password')
    , password2 = req.param('password2')
    , rememberme = req.param('rememberme')
    ;

  var user = new User({
    username: username
  });
  user.setPassword(password, password2);
  user.save(function(err, result) {
    if (err) {
      if (err.code === 11000) {
    // If username already exists in a database / duplicated username exists
        req.flash('registerErr', 'The username you selected already exists.');
        req.flash('registerErr', 'Please choose the different one.');
        return res.redirect('back');
      }
      if (err.name === 'ValidationError') {
        if (err.errors.password_mismatch) {
    // If one of the passwords did not match, flash the error
          req.flash('registerErr', 'Two passwords did not match. Please type them again.');
        } else {
    // Any other errors
          req.flash('registerErr', 'There was an unforeseen error. Please check your inputs.');
        }
        return res.redirect('back');
      }
      return next(err);
    }
    if (rememberme) {
      var newtoken = {
        username: result.username,
        authcookie: result.authcookie
      };
      lib.setCookie(res, JSON.stringify(newtoken));
    }
    req.session.username = result.username;
    res.redirect('top');
  });
};
