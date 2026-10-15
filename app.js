if (process.env.NODE_ENV === "production") {
    // require('dotenv').config();
}
require('dotenv').config();

//basic setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utilis/wrapasync.js");
// const expressError = require("./utilis/expressError.js");
// const { listingSchema } = require("./schema.js");
// const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { isLoggedIn } = require("./middleware.js");
let ports = 8080;

// const dbUrl = process.env.ATLASDB_URL;
const path = require("path");
const { Serializer, Deserializer } = require("v8");
// const review = require("./models/review.js");
// main().then(() => {
//     console.log("connect to databse");

// })
//     .catch((err) => {
//         console.log("err");
//     });

//for database
// async function main() {
//     await mongoose.connect(dbUrl);
//     console.log("connect to mongodb atlas");
// }
// main().catch((err) => {
//     console.error("MongoDB connection failed:", err.message);
// });

main()
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("MongoDB connection error:", err));

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("error");
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    //expire date 
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //for security
    },
};



// app.get("/", (req, res) => {
//     res.send("hi");

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//use for crate strategy
passport.use(User.createStrategy());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");


    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "collegeStudent"
//     });

//     let registerdUser = await User.register(fakeUser, "temple@123");
//     res.send(registerdUser);
// });


app.use("/listings", listingRouter);
app.use("/listings", reviewRouter);
app.use("/", userRouter);


app.use((err, req, res, next) => {
    console.error(err);

    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
    // res.status(statusCode).send(message);

});


app.listen(ports, (req, res) => {
    console.log("server works");
});
