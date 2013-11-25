// var util = require('util')
//   , fs = require('fs')
//   , models = require('../../models')
//   , User = models.UserModel
//   ;

// ### *function*: changeToNewPassword
/**
 *  Authentication with a cookie
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.changeToNewPassword = function(req, res, next) {
    // If old password matched with stored data, redirects to changeToNewPassword
  var condition = {
    username: req.param('username'),
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
    res.redirect('/topics/profile');
    });
  // var p1 = req.param('password')
  // ,   p2 = req.param('password2');
  // var condition = {
  //   username: req.param('username')
  // }
  // var user = new User({
  //   username: req.param('username')
  // });
  // var update = { password: user.setPassword(p1, p2) };
  // var condition = {
  //   username: req.body.username
  // };
  // User.findOne(condition, function(err, usr){
  //   if(err){
  //     next(err);
  //   }
  //     // Update the cookie
  //   User.update(condition, update, function(err, result) {
  //     if (err) {
  //       if (err.name === 'ValidationError') {
  //         if (err.errors.password_mismatch) {
  //     // If one of the passwords did not match, flash the error
  //           req.flash('passError', 'Two passwords did not match. Please type them again.');
  //         } 
  //         return res.redirect('back');
  //       }
  //       return next(err);
  //     }
  //     if (!result) {
  //       // If it didn't match with the stored data, flash the error
  //       req.flash('passError', 'Passwords didn\'n match. Please type them again.');
  //       return res.redirect('back');
  //     }
  //     req.flash('passError', 'meow');
  //     res.redirect('back');
  //     });
  // });
};

// ### *function*: changeToNewPassword
/**
 *  Redirects to changeToNewPassword
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next 
 */
exports.changeToNewPassword = function(req, res, next) {
  res.render('newPass/changeToNewPassword', {
    title: 'Change to your new password'
  });
};

