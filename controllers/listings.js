const Listing = require("../models/listing.js");
const expressError = require("../utilis/expressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const index = (async (req, res) => {

    const allListings = await Listing.find({});

    res.render("listings/index.ejs", {
        allListings
    });

});
const renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


const renderShowForm = async (req, res) => {
    const { id } = req.params;

    console.log("REQUESTED ID:", id);

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    console.log("FOUND LISTING:", listing);

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }
    console.log("Listing geometry:", listing.geometry);
    console.log("Listing coordinates:", listing.geometry?.coordinates);
    console.log("Listing location:", listing.location);

    res.render("listings/show.ejs", { listing });
};
const renderCreateForm = async (req, res, next) => {
    try {


        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();
        console.log(response);
        console.log("done");

        //file path and filename
        const url = req.file.path;
        const filename = req.file.filename;
        console.log(url, "..", filename);

        // console.log("BODY:", req.body);
        // console.log("LISTING:", req.body.listing);
        const newListing = new Listing(req.body.listing);
        //owner
        console.log("res.user");
        newListing.owner = req.user._id;
        console.log("NEW LISTING:", newListing);


        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry;
        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "new listing created successfully");
        res.redirect("/listings");
    }
    catch (err) {
        next(err);
    }
};


const renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you required for doesnot exits");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};
const renderUpdateForm = async (req, res) => {
    if (!req.body.listing) {
        throw new expressError(400, "send valid data for listing");
    }
    let { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        console.log(url, "..", filename);
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "new listing update");
    res.redirect(`/listings/${id}`);

};
const renderDeleteForm = async (req, res) => {
    let { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "new listing delete");
    res.redirect("/listings");
}

module.exports = { index, renderNewForm, renderShowForm, renderCreateForm, renderEditForm, renderUpdateForm, renderDeleteForm };

