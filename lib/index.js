var util = require('util')
  , fs = require('fs')
  , models = require('../models')
  , User = models.UserModel
  ;


// ### *function*: setCookie
/**
 *  Set cookie for a week in order to avoid loggining in by typing
 *  (If the cookie is stored and is matched with the stored data in a database, then the users can log in)
 *
 *  @param {object} res The HTTP response
 *  @param {object} val Value, which is the cookie called "auth"
 */
var setCookie = exports.setCookie = function(res, val) {
  res.cookie('authtoken', val, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  });
};

exports.parallel = function() {
  var list = arguments;
  return function(req, res, next) {
    var current = 0;
    var len = list.length;
    for (var i = 0; i < len; ++i) {
      var fun = list[i];
      fun(req, res, function() {
        if (++current === len) {
          next();
        }
      });
    }
  };
};

exports.fork = function(fun) {
  return function(req, res, next) {
    fun(req, res, function(){});
    next();
  };
};


// ### *function*: NotFound
/**
 *  To be able to get the path from the view, store stack trace in the error
 *
 *  @param {object} path Requested URI
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
 *  Handler for NotFound
 *
 *  @param {object} host View the requested URL
 */
exports.notFound = function(host) {
  return function(req, res, next) {
    next(new NotFound(host + req.url));
  };
};


// ### *function*: loginRequired
/**
 *  Authentication with a cookie
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.loginRequired = function(req, res, next) {
  if (req.session.username) {
    return next();
  }
  if (!req.cookies.authtoken) {
  // Redirect to sessions/new if there does't exist session or cookie
    return res.redirect('/sessions/new');
  }
  // If there is a cookie, use it for the authentication
  var token = JSON.parse(req.cookies.authtoken);
  var condition = {
    username: token.username,
    authcookie: token.authcookie
  }
  User.findOne(condition, function(err, result) {
    if (err) {
      return next(err);
    }
    if (!result) {
  // If the cookie didn't match with the stored data, redirect to the sessions/new
      return res.redirect('/sessions/new');
    }
    var update = { authcookie: models.getAuthCookie() };
  // Update the cookie
    User.update(condition, update, function(err, numAffected) {
      if (err) {
        return next(err);
      }
  // Update session
      req.session.username = result.username;
      var newtoken = {
        username: result.username,
        authcookie: update.authcookie
      };
  // Set the cookie with a new value
      setCookie(res, JSON.stringify(newtoken));
      next();
    });
  });
};

// ### *function*: helpers
/**
 *  View helpers
 *  1. Generate the link from URL and the name
 *  2. Replace spaces with &nbsp; and new lines for with <br />
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.helpers = {
  link_to: function(name, url) {
    return '<a href="' + url + '">' + name + '</a>';
  },
  text_format: function(text) {
    return text.replace(/ /g, '&nbsp;').replace(/\r\n|\n|\r/g, '<br />');
  }
};

// ### *function*: dynamicHelpers
/**
 *  Dynamic Helpers for
 *  1. Displaying username on the right corner
 *  2. Send flashes with corresponding messages
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.dynamicHelpers = {
  username_or_login: function(req, res) {
    if (req.session.username) {
      return ''
        + '<p class="login_user">Logged in as ' + req.session.username + '</p>'
        + '<p class="logout"><a href="/sessions/destroy">logout</a></p>';
    }
    return '<p class="login"><a href="/sessions/new">login</a></p>';
  },
  message: function(req, res) {
    return function(type) {
      var messages = req.flash(type);
      if (!messages) {
        return '';
      }
      var buf = '<ul class="message ' + type + '">';
      messages.forEach(function(msg) {
        var li = '<li>' + msg + '</li>';
        buf += li;
      });
      buf += '</ul>';
      return buf;
    };
  }
};

// ### *function*: notFoundHandler
/**
 *  Handler for 404 error status code
 *
 *  @param {object} err The 404 error
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
 *  Handler for 500 error status code
 *
 *  @param {object} err 500 error
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
