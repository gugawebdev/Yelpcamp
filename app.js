var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var localMongoose = require('passport-local-mongoose')
var User = require('./models/user');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var app = express();

//*** PASSPORT CONFIGURATION ***
app.use(require('express-session')({
	secret: 'Que pasa, hermano?!',
	resave:false,
	salveUnitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
mongoose.connect('NOPE!');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded(extended = true));
app.use(methodOverride('_method'))

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

var Yelp = require('./models/campground');
var Comment = require('./models/comment');





var port = (process.env.PORT || 5000);

app.listen(port, function(){
	console.log('Server listening on port 3000. At: ' + moment().format('LT'));
});
