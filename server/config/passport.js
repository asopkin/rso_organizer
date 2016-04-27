var LocalStrategy = require('passport-local').Strategy;
var Student = require('./models/student');

module.exports = function(passport) {
	passport.serializeStudent(function(student, done) {
		done(null, student.netId);
	});

	passport.deserializeStudent(function(id, done) {
		Student.findById(id, function(err, student) {
			done(err, student);
		});
	});

	// Define local-signup here
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', 
		password : 'password' 
	},
	function(email, password, done){
		Student.findOne({'local.email': email}, function(err, student){
			if(err)
				return done(err);
			if(student){
				return done(null, false);
			}
			else{
				var newStudent = new Student();
				newStudent.netId = email;
				newStudent.password = newStudent.generateHash(password);

				newStudent.save(function(err){
					if(err)
						throw err;
					return done(null, newStudent);
				});
			}
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField : 'netId',
		passwordField: 'password'
	}, 
	function(email, password, done){
		Student.findOne({'netId': netId}, function(err, student){
			if(err)
				return done(err);
			if(!student){
				return done(null, false);
			}
			if(!student.validPassword(password))
				return done(null, false);
			return done(null, student);
		});
	}));

};
