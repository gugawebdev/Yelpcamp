var express = require('express');
var router = express.Router();
var Yelp = require('../models/campground');
var Comment = require('../models/comment');
var User = require('../models/user');
var passport = require('passport');


	router.get('/signup', function(req, res){
		res.render('signup');
});


router.post('/signup', function(req, res){
	User.register({username: req.body.username}, req.body.password, function(err, result){
		if (err) {
			console.log('Usuário não pode ser cadastrado')
		}
		else{
			passport.authenticate('local')(req, res, function(){
				req.flash('success', 'You have signedup succesfully. Welcome!, ' + req.user.username  );
				res.redirect('/login');
			});
		}
	});
});


router.get('/login', function(req, res){
		res.render('login');
});


router.post('/login', passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect:'/login'
	}), function(req, res){
});


router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Logget out succesfully');
	res.redirect('/');
});

//*** MIDDLEWARE FOR USER SESSION VALIDATION ***
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next()
	}
	else{
		res.redirect('/login');
	}
}



module.exports = router;
