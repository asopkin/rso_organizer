module.exports = function(app, passport) {
	console.log("exports1");

	// Define POST route for /signup endpoint
	app.post('/api/signup', passport.authenticate('local-signup'), function(req, res){
		console.log("what");
		console.log(req);
		console.log(req.user);
		res.json({
			user: req.user
		})
		//res.redirect('partials/profile.html');
	});

	app.options('/api/signup', function(req, res){
	  console.log("options");
      res.writeHead(200);
      res.end();
	});

	// Define POST route for /signup endpoint
	app.post('/api/login', passport.authenticate('local-login'), function(req, res){
		console.log("login");
		res.json({
			user: req.user
		})
		//res.redirect('partials/profile.html');
	});

	app.options('/api/login', function(req, res){
      res.writeHead(200);
      res.end();
	});

	// Define GET route for /profile endpoint
	app.get('/api/profile', isLoggedIn, function(req, res){
		console.log("prof get");
		res.json({
			user: req.user
		});
	});
	console.log("ey");
	// Define GET route for /logout endpoint
	app.get('/api/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
	// Define custom isLoggedIn middleware
	function isLoggedIn(req, res,next){
		console.log("check login");
		//console.log(req);
		if(req.isAuthenticated())
			return next();
		res.json({
			error: "User not logged in"
		});
	};

	

};