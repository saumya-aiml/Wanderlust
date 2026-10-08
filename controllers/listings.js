const Listing = require("../models/listing.js");
const expressError = require("../utilis/expressError.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const baseclient = mbxgeocoding({ accessToken: mapToken });
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

    res.render("listings/show.ejs", { listing });
};
const renderCreateForm = async (req, res, next) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: res.body.listing.location,
            limit: 1,
        })
        .send();


    //file path and filename
    const url = req.file.path;
    const fileName = req.file.filename;
    console.log(url, "..", fileName);

    // console.log("BODY:", req.body);
    // console.log("LISTING:", req.body.listing);
    const newListing = new Listing(req.body.listing);
    //owner
    console.log("res.user");
    newListing.owner = req.user._id;
    console.log("NEW LISTING:", newListing);


    newListing.image = { url, fileName };
    newListing.geometry = response.body.features[0].geometry
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "new listing created successfully");
    res.redirect("/listings");


};
const renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you required for doesnot exits");
        res.redirect("/listings");
    }
    const originalImageUrl = listing.image.url;
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
        const fileName = req.file.filename;
        console.log(url, "..", fileName);
        listing.image = { url, fileName };
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

