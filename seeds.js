var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Yelp = require('./models/campground');

var data = [{name: 'Pururuka Creek', photo:'https://farm5.staticflickr.com/4123/4943676109_b93d9c1203.jpg' , description: 'A fucking amazing campground, brah!'},
{name: 'Colorado Creek', photo: 'https://farm6.staticflickr.com/5694/21041875770_ffea6404d0.jpg', description: 'The best campground for kids! Enjoy us!'},
{name: 'Chatuba Creek', photo: 'https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg', description: 'The best place for org... I mean, for a barbecue.'}];

var commentData = [{author:'KID BENGALA', text: 'EU VOU COMER TEU CU, SUA VAGABUNDA'}, {author:'vagabunda', text:'NÃO VAI NÃO'}];





function seedDB(){
   //Remove all campgrounds
   Yelp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Yelp.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;

