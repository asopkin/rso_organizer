// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
//var mongoose2 = require('mongoose');
//replace this with your Mongolab URL
mongoose.connect('mongodb://CS498web:CS498web@ds011291.mlab.com:11291/498final');
//mongoose.connect('mongodb://localhost/passport-demo'); // db connection
require('./config/passport')(passport);

// Create our Express application
var app = express();


// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT");
  next();
};

app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({secret: 'passport demo'})); //credentials saved in session

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
require('./routes.js')(app, passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


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


// Start the server
app.listen(port);
console.log('Server running on port ' + port);




