//initialize database
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
main().then(() => {
    console.log("connect to databse");

})
    .catch((err) => {
        console.log("err");
    })
//for database
async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
}

// const initdb = async () => {
//     await Listing.deleteMany({});
//     initData.data.map((obj) => ({
//         ...obj,
//         owner: "6ac0c0c8879e86546a8e4a2d"
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");

// };
const initdb = async () => {
    await Listing.deleteMany({});

    const listingsWithOwner = initData.data.map((obj) => ({
        ...obj,
        owner: "6ac0c0c8879e86546a8e4a2d"
    }));

    await Listing.insertMany(listingsWithOwner);

    console.log("data was initialized");
};
initdb();