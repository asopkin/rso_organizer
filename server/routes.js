module.exports = function(app, passport) {

	// Define POST route for /signup endpoint
	app.post('/signup', passport.authenticate('local-signup'), function(req, res){
		console.log("what");
		res.redirect('partials/profile.html');
	});

	// Define POST route for /signup endpoint
	app.post('/login', passport.authenticate('local-login'), function(req, res){
		console.log("login");
		res.redirect('partials/profile.html');
	});

	// Define GET route for /profile endpoint
	app.get('/profile', isLoggedIn, function(req, res){
		console.log("prof");
		res.json({
			user: req.user
		});
	});

	// Define GET route for /logout endpoint
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
	// Define custom isLoggedIn middleware
	function isLoggedIn(req, res,next){
		console.log("check login");
		if(req.isAuthenticated())
			return next();
		res.json({
			error: "User not logged in"
		});
	};

	

};