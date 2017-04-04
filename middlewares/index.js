var Comment = require('../models/comment');
var Yelp = require('../models/campground');
var flash = require('connect-flash');

module.exports = {

isLoggedIn: function(req, res, next){
  if (req.isAuthenticated()) {
    return next();
    req.flash('success',  'You are logged.');
  }
  else{
    req.flash('error', 'You arent logged');
    res.redirect('/login');
  }
},

checkUserCampground: function(req, res, next){
    if (req.isAuthenticated()) {
      Yelp.findById(req.params.id, function(err, result){
        if (result.owner === req.user.username) {
          next();
        }
        else{
          res.redirect('/campgrounds/' + req.params.id);
        }
      });
    }else {
      res.redirect('/login');
    }
},

checkUserComment: function(req, res, next){
  if (req.isAuthenticated()) {
      Comment.findById(req.params.comment, function(err, result){
        if (result.author === req.user.username) {
          next();
        }
        else{
          res.redirect('/campgrounds' + req.params.id);
        }
      });
  }
  else{
    res.redirect('/login');
  }
}

};
