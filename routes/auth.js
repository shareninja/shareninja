var models = require('../models')
  , lib = require('../lib')
  , User = models.UserModel
  ;

exports.new = function(req, res, next) {
  res.render('new', {
    title: 'Login'
  });
};

exports.create = function(req, res, next) {
  var username = req.param('username')
    , password = req.param('password')
    , password2 = req.param('password2')
    , email = req.param('email')
    ;

  var user = new User({
    username: username
    email: email
  });
  user.setPassword(password, password2);
  user.save(function(err, result) {
    if (err) {
      if (err.code === 11000) {
        // There exists user already
        req.flash('registerErr', 'User already exists. Please type different username.');
        return res.redirect('back');
      }
      if (err.name === 'ValidationError') {
        if (err.errors.password_mismatch) {
        // Password doesn't match
          req.flash('registerErr', 'Password didn\'t match. Please check your passwords.');
        } else {
        // Other errors
          req.flash('registerErr', 'Please check your input again.');
        }
        return res.redirect('back');
      }
      return next(err);
    }
    req.session.username = result.username;
    res.redirect('top');
  });
};

exports.delete = function(req, res) {
  req.session.destroy();
  res.redirect('/new');
};


// // Calls Sequelize
// var Sequelize = require("sequelize");
// // Access to database
// var sequelize = new Sequelize('jamjam', 'username', 'password', {
//     dialect: 'sqlite' 
//     , storage: './database/jamjam.db'
//     , host: "localhost"
//     , port: 3003
// });

// var createNew = sequelize.define('createNews', {
//       // First name
//       first: { type: Sequelize.STRING,
//                validate: { isAlphanumeric: true, notNull: true } }
//       // Last name
//     , last: { type: Sequelize.STRING,
//                   validate: { isAlphanumeric: true, notNull: true } }
//       // Fullname
//     , fullname: { type: Sequelize.STRING,
//                   validate: {notNull: true } }
//       // Username has to be unique, meaning, no duplicates
//     , username: { type: Sequelize.STRING, unique: true,
//                   validate: { isAlphanumeric: true, notNull: true } }
//       // Email
//     , email: { type: Sequelize.STRING,
//                validate : { isEmail: true, notNull: true  } }
//      // Password 1
//     , password: { type: Sequelize.STRING, 
//                   validate: { notNull: true } }
//     // Password 2
//     , password2: { type: Sequelize.STRING, 
//                    validate: {notNull: true} }
//     // JamJam
//     , jamjam: { type: Sequelize.STRING,
//                validate: { isAlphanumeric: true, notNull: true } }  

//   },{
//     instanceMethods: {
//       getFullname: function(){
//         return[this.first, this.last].join(' ')
//       }
//     }
//   });


// module.exports = function(models) {
//   return {
//   // Signup form with corresponding variabless
//       signup: function(req, res) {
//       	var first = req.param('first')
//           , last = req.param('last')
//   		  , username = req.param('username')
//    		  , email = req.param('email')
//     	  , password = req.param('password')
//     	  , password2 = req.param('password2')
//     	;
//     	if(!first || !last || !username || !email || !password || !password2){
//     		req.flash('registerError', 'Please fill out everything');
//     		return res.redirect('back');
//     	}
//     	if(password !== password2){
//     		req.flash('registerError', 'Password did not match');
//     		return res.redirect('back');
//     	}
//     	// Finds if there are any duplicates
//     	createNew.find({
//     	  	where: {
//     	  		username: username
//     	  	}
//     	  })
//     	// If there are duplicates
//     	  .success(function(user){
//     	  	if(user){
//     	// Flashes an error message and redirects to new
//     	  		req.flash('registerError', 'Username exists');
//     			return res.redirect('back');
//     	  	}
//     	// If there is no duplicates
//     	  	else{
//       // Create a fullname in a table
//             var fullname = createNew.build({
//               first: first,
//               last: last})
//               .getFullname();
//       // Saves the corresponding info in database
//       // And creates a new user in database
//               createNew.build({
//                 first: first,
//                 last: last,
//                 fullname: fullname,
//                 username: username,
//                 email: email,
//                 password: password,
//                 password2: password2
//               }).save()
//     			.success(function(models){
//     	// Delete password so that client cannot see it again / have to retype
// 		    		delete models.password;
// 		    		req.session.username = models.username;
// 				    res.redirect('/');
//     			})
//     	  	}
//     	  })
//     	// Flashes error if there is any internal error
//     	  .error(function(error){
//     	  	req.flash('loginError', 'Something is wrong with your database');
//     	  	return res.redirect('back');
//     	  });
//       }


//       // Login form
//     , login: function(req, res) {
//     	var username = req.param('username')
//     	  , password = req.param('password')
//     	 ;
//     	  if(!username || !password){
//     	  	req.flash('loginError', 'Please fill out everything');
//     	  	return res.redirect('back');
//     	  }
//     	// Finds username and password from the database
//     	  createNew.find({
//     	  	where: {
//     	  		username: username,
//     	  		password: password
//     	  	}
//     	  })
//     	// Checks if typed in username and the password matches with stored info
//     	  .success(function(user){
//     	// If matches, redirects to top/index
//     	  	if(user){
//       // Delete password so that client cannot see it again / have to retype
//     	  		delete user.password;
//     	  		req.session.username = user.username;
//     	  		res.redirect('/');
//     	  	}
//     	// Otherwise, flahses error
//     	  	else{
//     	  		req.flash('loginError', 'Authentication failed');
//     	  		return res.redirect('back');
//     	  	}
//     	  })
//     	// Flashes error if there is any internal error
//     	  .error(function(error){
//     	  	req.flash('loginError', 'Something is wrong with your database');
//     	  	return res.redirect('back');
//     	  });
//       }



//       // Logout form which destroys session and redirects to new
//     , logout: function(req, res) {
//       	req.session.destroy();
//       	res.redirect('new');
//       }
//   };
// };



