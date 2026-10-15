const express = require("express");
// const app = express();
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilis/wrapasync.js");
const expressError = require("../utilis/expressError.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
//upload files
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// const listingController = require("../controllers/listing.js");

const { index, renderNewForm, renderShowForm, renderCreateForm, renderEditForm, renderUpdateForm, renderDeleteForm } = require("../controllers/listings.js");

// const wrapasync = require("../utilis/wrapasync.js");

console.log(typeof index);


router.route("/")
    .get(wrapAsync(index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),

        validateListing,
        wrapAsync(renderCreateForm)
    );


// .post((req, res) => {
//     res.send(req.body);
// });

router.get("/new", isLoggedIn, renderNewForm);

router.route("/:id")
    .get(isLoggedIn, wrapAsync(renderShowForm)
    )
    .put( (req, res, next) => {
            console.log("PUT ROUTE REACHED");
            next();
        },
        isLoggedIn, isOwner, upload.single("listing[image]"), validateListing,
        wrapAsync(renderUpdateForm)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(renderDeleteForm)
    );


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm)
);





module.exports = router;