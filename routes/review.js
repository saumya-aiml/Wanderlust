const express = require("express");
// const app = express();
const router = express.Router();
const wrapAsync = require("../utilis/wrapasync.js");
const expressError = require("../utilis/expressError.js");
// const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const { createListing, deleteListing } = require("../controllers/review.js");



//create review
router.post(
    "/:id/reviews",
    isLoggedIn,
    validateReview,
    wrapAsync(createListing)
);

// delete reviews post
router.delete("/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(deleteListing)
);

module.exports = router;