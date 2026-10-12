const mongoose = require("mongoose");
const review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        // type: String,
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "modern-stone-and-glass-house-at-night-photo"
        }
    },
    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review"
        },
    ],
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    //  coordinates: {
    //     type: [number],
    //     require: true
    //  }

    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    },

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.review } });
    }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;