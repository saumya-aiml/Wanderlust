const User = require("../models/user.js");

const renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}
const signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to Wanderlust");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.render("users/signup.ejs");
    }

};
const renderLoginForm = (req, res) => {
    res.render("users/login.ejs");

};
const login = (req, res) => {
    req.flash("success", "welcome to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
const logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}
module.exports = { signup, renderSignupForm, renderLoginForm, login, logout };


