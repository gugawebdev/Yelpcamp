var express = require('express');
var router = express.Router();
var Yelp = require('../models/campground');
var Comment = require('../models/comment');
var passport = require('passport');
var middleware = require('../middlewares/index');


router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function(req, res){
	Yelp.findById(req.params.id, function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			res.render('comments/new', {data: result});
		}
	});
});
router.post('/campgrounds/:id/comments', middleware.isLoggedIn, function(req, res){
		Yelp.findById(req.params.id, function(err, result){
			if (err) {
				console.log(err);
			}
			else {
				Comment.create({author:req.user.username, text:req.body.text}, function(err, comment){
					if (err) {
						console.log(err);
					}
					else{
						result.comments.push(comment);
						result.save();
						console.log('Comment created succesfully');
						res.redirect('/campgrounds/' + result._id);
					}
				});
			}
		})
});

router.get('/campgrounds/:id/comments/:comment/edit', middleware.checkUserComment, function(req, res){
		Yelp.findById(req.params.id, function(err, result){
			if (err) {
				console.log(err);
			}
			else{
				Comment.findById(req.params.comment, function(error, resultComment){
					if (err) {
						console.log(err);
					}
					else{
						res.render('edit_comment', {campID: result, commentID: resultComment})
					}
				})
			}
		})
})

router.put('/:comment/edit', middleware.checkUserComment, function(req, res){
		Comment.findByIdAndUpdate(req.params.comment, {author:req.user.username, text:req.body.text}, function(err, result){
			if (err) {
				console.log(err);
			}
			else{
				res.redirect('/campgrounds');
			}
		});
});

router.delete('/:comment/delete', middleware.checkUserComment,function(req, res){
	Comment.findByIdAndRemove(req.params.comment, function(err, result){
		if (err) {
			console.log(err);
		}
		else{
			console.log('comentário deletado com sucesso');
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
