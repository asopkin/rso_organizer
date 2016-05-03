// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

/** passport stuff **/
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
//var mongoose2 = require('mongoose');
//replace this with your Mongolab URL
mongoose.connect('mongodb://CS498web:CS498web@ds011291.mlab.com:11291/498final');
//mongoose.connect('mongodb://localhost/passport-demo'); // db connection

// Create our Express application
var app = express();


// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT");
  next();
};

app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({secret: 'passport'})); //credentials saved in session
app.use(express.static(__dirname + '/client/public'));

app.use(passport.initialize());
app.use(passport.session());



//passport stuff
var userSchema = mongoose.Schema({
    email		: String,
	password	: String
});


var User = mongoose.model('User', userSchema);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local-signup', new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password'
},
    function(email, password, done) {
        console.log("come to find one");
        User.findOne({'email' : email}, function(err, user) {
			if(err){
                console.log("have error");
                return done(err);
            }
			if(user) {
                console.log("already have user");
				return done(null, false);
			} else {
				var newUser = new User();

				newUser.email = email;
				newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);


				newUser.save(function(err) {
					if(err)
						throw err;
					return done(null, newUser);
				});
			}
        });
    }
));

passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
    function(email, password, done) {
        console.log("in local-login");
		User.findOne({'email': email}, function(err, user) {
			if(err){
                console.log("error in local-login");
                return done(err);
            }
			if(!user){
                console.log("no user find");
                return done(null, false);
            }
            var valid = bcrypt.compareSync(password, user.password);
			if(!valid){
                console.log("wrong password");
                return done(null, false);
            }
            console.log("everything correct in local-login");
			return done(null, user);

		});
	}
));






// Use the body-parser package in our application
//app.use(bodyParser.urlencoded({
//  extended: true
//}));

// All our routes will start with /api
app.use('/api', router);


//Define routes here



var event = require('./api/event');
router.get('/events', event.getAll);
router.post('/events', event.create);
router.get('/events/:id', event.getOne);
router.put('/events/:id', event.replace);
router.delete('/events/:id', event.deleteOne);


var student = require('./api/student');
router.get('/students', student.getAll);
router.post('/students', student.create);
router.get('/students/:id', student.getOne);
router.put('/students/:id', student.replace);
router.delete('/students/:id', student.deleteOne);

var organization = require('./api/organization');
router.get('/organizations', organization.getAll);
router.get('/organizations/oneCategory/:category', organization.getOneCategory);
router.post('/organizations', organization.create);
router.get('/organizations/:id', organization.getOne);
router.put('/organizations/:id', organization.replace);
router.delete('/organizations/:id', organization.deleteOne);

//End routes here

//passport stuff
app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    console.log("come to signup");
	res.redirect('/#/profile');
});

app.post('/login', passport.authenticate('local-login'), function(req, res) {
    console.log("come to login");
    console.log(req.session);

//    req.session.save();
	res.redirect('/#/profile');
});

app.get('/#/profile', isLoggedIn, function(req, res) {
    console.log("come to profile");
    console.log("User was:" + req.user);
	res.json({
		user: req.user
	});
});


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
    console.log("come to isLogged in");
    console.log(req.session);

	if(req.isAuthenticated()){
        console.log("pass authenticate");
        return next();
    }
    console.log("fail authenticate");
	res.json({
		error: "User not logged in"
	});
}



// Start the server
app.listen(port);
console.log('Server running on port ' + port);




