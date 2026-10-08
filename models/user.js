const mongoose = require("mongoose");
// const Schema = mongoose.schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
// const { useTransition } = require("react");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});
// mongoose automatically will define username and password with hash and salt value  so we don not need to define
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
