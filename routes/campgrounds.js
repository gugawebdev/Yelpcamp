var express = require('express');
var router = express.Router();
var Yelp = require('../models/campground');
var Comment = require('../models/comment');
var passport = require('passport');
var middleware = require('../middlewares/index');

router.get('/', function(req, res){
	res.render('index');
});

router.get('/campgrounds/new', middleware.isLoggedIn,  function(req, res){
	res.render('new_camp');
});

router.get('/campgrounds', function(req, res){

	Yelp.find({}, function(err, camps){

		if (err){
			console.log("Some shit happened, brah!");
		}

		else{

			res.render('campgrounds', {campgrounds: camps});

		}
	});

});

router.post('/campgrounds/add_camp', isLoggedIn, function(req, res){
	var newCampground = {name: req.body.camp_name, photo: req.body.camp_image, description: req.body.camp_desc, price:req.body.camp_price, owner:req.user.username};

	Yelp.create(newCampground, function(err, next){
		if (err) {
			console.log('Some error happened');
		}
		else{
			req.flash('success', 'Campground created succesfully');
			res.redirect('/campgrounds');
		}
	});
});


router.get('/campgrounds/:id', middleware.isLoggedIn, function(req, res){
	Yelp.findById(req.params.id).populate('comments').exec(function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			res.render('show', {campID: result});
		}
	});
});

router.get('/campgrounds/:id/edit', middleware.checkUserCampground, function(req, res){
	Yelp.findById(req.params.id, function(err, result){
		if (err) {
			console.log(err);
		}
		else {
			res.render('edit_camp', {campID : result});
		}
	})
})

router.put('/campgrounds/:id/edit', middleware.checkUserCampground, function(req, res){
	var updateCamp = {name: req.body.name, photo: req.body.photo, description:req.body.description, price: req.body.price};
	Yelp.findByIdAndUpdate(req.params.id, updateCamp, function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			req.flash('success', 'Updated successfully');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

router.delete('/campgrounds/:id/delete', middleware.isLoggedIn, function(req, res){
	Yelp.findByIdAndRemove(req.params.id, function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			req.flash('success', 'Campground deleted succesfully');
			res.redirect('/campgrounds');
		}
	})
})



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
