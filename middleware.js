const Listing = require("./models/listing");
const expressError = require("./utilis/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");


const isLoggedIn = (req, res, next) => {
    // to check user is logged or not
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create new listings");
        return res.redirect("/login");
    }
    next();
};

// const saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();

// };
// module.exports = { saveRedirectUrl };
const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
};
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, "errMsg");
    } else {
        next();
    }
};
const isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports = { isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview, isReviewAuthor };