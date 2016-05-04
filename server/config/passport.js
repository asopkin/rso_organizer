var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/student');

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
		usernameField : 'netId', 
		password : 'password' 
	},
	function(netId, password, done){
		User.findOne({'netId': netId}, function(err, user){
			console.log("find");
			if(err)
				return done(err);
			if(user){
				return done(null, false);
			}
			else{
				var newUser = new User();
				newUser.netId = netId;
				newUser.name = "";
				newUser.password = newUser.generateHash(password);

				newUser.save(function(err){
					if(err)
						throw err;
					return done(null, newUser);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'netId',
		passwordField: 'password'
	}, 
	function(netId, password, done){
		console.log("loooking");
		User.findOne({'netId': netId}, function(err, user){
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
