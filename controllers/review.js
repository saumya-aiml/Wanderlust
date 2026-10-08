const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const createListing = async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "new review create");
    res.redirect(`/listings/${listing._id}`);
};
const deleteListing = async (req, res,) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { Review, reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "new review delete");
    res.redirect(`/listings/${id}`);

};
module.exports = { createListing, deleteListing };