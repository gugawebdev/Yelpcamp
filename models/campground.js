var mongoose = require('mongoose');

var yelpSchema = new mongoose.Schema({
	name: String,
	photo: String,
	description: String,
	price:Number,
	owner: String,
	comments: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref:  "Comment"
	}
	]
});


module.exports = mongoose.model('Yelp', yelpSchema);
