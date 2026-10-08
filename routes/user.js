const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utilis/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, renderSignupForm, renderLoginForm, login, logout } = require("../controllers/user.js");
console.log("renderSignupForm:", renderSignupForm);
console.log("type:", typeof renderSignupForm);
//signup user
router.get("/signup", renderSignupForm);

router.post("/signup", wrapasync(signup)
);
//login user
router.get("/login", saveRedirectUrl, renderLoginForm);

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), (login)
);


//logout user
router.get("/logout", logout);
module.exports = router;