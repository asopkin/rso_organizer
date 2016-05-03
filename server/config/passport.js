var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

console.log("pport");
module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// Define local-signup here
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', 
		password : 'password' 
	},
	function(email, password, done){
		User.findOne({'local.email': email}, function(err, user){
			console.log("find");
			if(err)
				return done(err);
			if(user){
				return done(null, false);
			}
			else{
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				newUser.save(function(err){
					if(err)
						throw err;
					return done(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField: 'password'
	}, 
	function(email, password, done){
		User.findOne({'local.email': email}, function(err, user){
			console.log("finding for login");
			console.log(user);
			if(err)
				return done(err);
			if(!user){
				return done(null, false);
			}
			if(!user.validPassword(password))
				return done(null, false);
			console.log("login works properly");
			return done(null, user);
		});
	}));

};
