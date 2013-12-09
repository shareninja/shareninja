var util = require('util')
  , fs = require('fs')
  , models = require('../../models')
  , User = models.UserModel
  ;



// ### *function*: checkOldPassword
/**
 *  Check password if it matches with the logged-in username
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.checkOldPassword = function(req, res, next) {
  // If old password matched with stored data, redirects to changeToNewPassword
  var condition = {
    username: req.session.username,
    password: req.param('oldPassword')
  }
  User.findOne(condition, function(err, result) {
    if (err) {
      return next(err);
    }
    if (!result) {
      // If it didn't match with the stored data, flash the error
      req.flash('passErr', 'Password did not match with your username. Please type it again.');
      return res.redirect('back');
    }
    res.redirect('/newPass/changeToNewPassword');
    });
};


// ### *function*: changePassword
/**
 *  Redirects to changePassword
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.changePassword = function(req, res, next) {
  res.render('lib/changePassword', {
    title: 'Change your password'
  });
};


