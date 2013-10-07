// Calls Sequelize
var Sequelize = require("sequelize");
// Access to database
var sequelize = new Sequelize('jamjam', 'username', 'password', {
    dialect: 'sqlite' 
    , storage: './database/jamjam.db'
    , host: "localhost"
    , port: 3003
});

var profile = sequelize.define('createNew', {
           // First name
      first: { type: Sequelize.STRING,
               validate: { isAlphanumeric: true, notNull: true } }
      // Last name
    , last: { type: Sequelize.STRING,
                  validate: { isAlphanumeric: true, notNull: true } }
      // Fullname
    , fullname: { type: Sequelize.STRING,
                  validate: {notNull: true } }
      // Username has to be unique, meaning, no duplicates
    , username: { type: Sequelize.STRING, unique: true,
                  validate: { isAlphanumeric: true, notNull: true } }
      // Email
    , email: { type: Sequelize.STRING,
               validate : { isEmail: true, notNull: true  } }
    // JamJam
    , jamjam: { type: Sequelize.STRING,
               validate: { isAlphanumeric: true, notNull: true } } 
  });

exports.show = function(req, res){
    var username = req.session.username;
     ;
    profile.find({
         where: ["username = ?", username]
       })
     // If there exists typed-in-fullname in a database
       .success(function(profile){
         if(profile){                         
              res.render('profile', {  title  : 'My Profile',
                                         profile: profile
                                  });
                       }
     // If user doesn't exist
         else{
           
         }
       })
       .error(function(error){
                
       });
};





