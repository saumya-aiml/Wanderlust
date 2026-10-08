const mongoose = require("mongoose");
// const Schema = mongoose.schema;

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});
module.exports = mongoose.model("review", reviewSchema);




