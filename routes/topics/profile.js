var util = require('util')
  , fs = require('fs')
  , models = require('../../models')
  , User = models.UserModel
  ;

// ### *function*: show
/**
 *  Redirects to profile
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.show = function(req, res, next) {
  res.render('topics/profile', {
    title: 'Profile'
  });
};

// ### *function*: deleteShow
/**
 *  Redirects to profile
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.deleteShow = function(req, res, next) {
  res.render('topics/delete', {
    title: 'Delete your account'
  });
};

// ### *function*: deleteAccount
/**
 *  Authentication with a cookie
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.deleteAccount = function(req, res, next) {
  var condition = {
    username: req.param('username'),
    password: req.param('password')
  }
  User.findOne(condition, function(err, result) {
    if (err) {
      return next(err);
    }
    if (!result) {
      // If it didn't match with the stored data, flash the error
      req.flash('passError', 'Password did not match with your username. Please type it again.');
      return res.redirect('back');
    }
    User.remove(condition, function(err, result) {
        if (err) {
          return next(err);
        }
        if (result === 0) {
          // When nothing has deleted
          req.flash('passError', 'Can\'t delete this user');
          return res.redirect('back');
        }
          req.session.destroy();
          res.redirect('/sessions/thankyou');
    });
   });
};

