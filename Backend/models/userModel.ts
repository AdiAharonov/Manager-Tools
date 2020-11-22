const newMongoose = require("mongoose");

const userSchema = new newMongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 5},
    displayName: {type: String}
})

const User = newMongoose.model("user", userSchema);

module.exports = User;