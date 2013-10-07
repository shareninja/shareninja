var util = require('util')
  , fs = require('fs')
  ;

// ### *function*: dynamicHelpers
/**
 *  Shows username if logged in, otherwise shows 'login'
 *
 *  @param {object} text The text to convert
 */
exports.dynamicHelpers = {
  username_or_login: function(req, res) {
    if (req.session.username) {
      return ''
        + '<p class="login_user">Logged in as ' + req.session.username + '</p>'
        + '<p class="logout"><a href="/auth/logout">logout</a></p>';
    }
    return '<p class="login"><a href="/new">login</a></p>';
  },
  message: function(req, res) {
    return function(type) {
      var messages = req.flash(type);
      if (!messages) {
        return '';
      }
      var t = '<ul class="message ' + type + '">';
      messages.forEach(function(msg) {
        var li = '<li>' + msg + '</li>';
        t += li;
      });
      t += '</ul>';
      return t;
    };
  }
};

// ### *function*: loginRequired
/**
 *  Authentication for users, if not logged in, every page will be redirected to new
 *  Otherwise, passes callback 'next'
 *
 *  @param {object} text The text to convert
 */
exports.loginRequired = function(req, res, next){
  if(req.session.username)
    return next();
  res.redirect('/new');
};



// ### *function*: NotFound
/**
 *  Receives 404 error for NotFound URI request
 *
 *  @param {object} path The path 
 */
function NotFound(path) {
    Error.call(this, 'Not Found');
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotFound';
    this.path = path;
  }
util.inherits(NotFound, Error);

exports.NotFound = NotFound;

// ### *function*: notFound
/**
 *  Middleware that generates NotFound when executed  
 *
 *  @param {object} host The host
 */
exports.notFound = function(host) {
  return function(req, res, next) {
    next(new NotFound(host + req.url));
  };
};

// ### *function*: notFoundHandler
/**
 *  Gets all the errors from throw or next(error) and shows 404 error
 *
 *  @param {object} err The errors
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.notFoundHandler = function(err, req, res, next) {
  if (err instanceof NotFound) {
    res.render('err', {
      status: 404,
      title: '404 Page Not Found',
      err: err
    });
  } else {
    return next(err);
  }
};



// ### *function*: errorHandler
/**
 *  Gets all server errors and shows 500 error
 *
 *  @param {object} err The errors
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.errorHandler = function(err, req, res) {
  res.render('err', {
    status: 500,
    title: '500 Internal Server Error',
    err: err
  });
};

