const { isEmail } = require("validator")
const mongoose = require("mongoose")
const { getModeForUsageLocation } = require("typescript")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        validate: [isEmail,"input not a valid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength:6
    }
})

const user = mongoose.model("user", userSchema)

module.exports = user