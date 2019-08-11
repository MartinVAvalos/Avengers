const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
    name: String,
    image: String,
    quirk: String,
    description: String
});

module.exports = mongoose.model("Hero", heroSchema);































// var mongoose = require("mongoose");

// var campgroundSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String,
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });

// module.exports = mongoose.model("Campground", campgroundSchema);