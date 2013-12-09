var util = require('util')
    , fs = require('fs')
    , models = require('../../models')
    , User = models.UserModel
    ;

// ### *function*: changeToNewPassword
/**
 *  Authentication with a cookie
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next
 */
exports.changeToNewPassword = function(req, res, next) {
    console.log('username: ', req.session.username);
    var condition = {
        username: req.session.username
    }
    var p1 = req.param('password');
    var p2 = req.param('password2');
    if(p1 == p2){
        User.update(condition,
            {$set : {password : p1}},
            function(err, result){
                if(err){
                    if (err.name === 'ValidationError') {
                        if (err.errors.password_mismatch) {
                            // If one of the passwords did not match, flash the error
                            req.flash('passError', 'Two passwords did not match. Please type them again.');
                        } else {
                            // Any other errors
                            req.flash('passError', 'There was an unforeseen error. Please check your inputs.');
                        }
                        return res.redirect('back');
                    }
                    return next(err);

                }
                if(result){
                    console.log('result: ', result);
                    req.flash('passError', 'Password has been successfully updated');
                    res.redirect('/topics/profile');
                }
            });
    }else{
        req.flash('passError', 'Confirmation password did not match. Please check it again.');
        res.redirect('back');
    }
    /*
     User.findOne(condition, function(err, result) {
     if (err) {
     return next(err);
     }
     if (!result) {
     // If it didn't match with the stored data, flash the error
     req.flash('passError', 'Password did not match with your username. Please type it again.');
     return res.redirect('back');
     }
     var p1 = req.param('password')
     ,   p2 = req.param('password2');
     if(p1!==p2){
     req.flash('passError', 'Confirmation password did not match. Please check it again.');
     return res.redirect('back');
     }
     if(p1==p2){
     User.remove(condition, function(err, result) {
     if (err) {
     return next(err);
     }
     if (result === 0) {
     // When nothing has deleted
     req.flash('passError', 'Can\'t delete this user');
     return res.redirect('back');
     }
     var user = new User({
     username: req.param('username')
     });
     user.setPassword(p1, p2);
     user.save(function(err, result) {
     if (err) {
     if (err.name === 'ValidationError') {
     if (err.errors.password_mismatch) {
     // If one of the passwords did not match, flash the error
     req.flash('passError', 'Two passwords did not match. Please type them again.');
     } else {
     // Any other errors
     req.flash('passError', 'There was an unforeseen error. Please check your inputs.');
     }
     return res.redirect('back');
     }
     return next(err);
     }
     req.session.username = result.username;
     req.flash('passError', 'Password has been successfully updated');
     res.redirect('back');
     });
     });
     }
     });
     */

};

// ### *function*: changeToNewPassword
/**
 *  Redirects to changeToNewPassword
 *
 *  @param {object} req The HTTP request
 *  @param {object} res The HTTP response
 *  @param {object} next Pass handlers to the next
 */
exports.showPass = function(req, res, next) {
    res.render('newPass/changeToNewPassword', {
        title: 'Change to your new password'
    });
};

