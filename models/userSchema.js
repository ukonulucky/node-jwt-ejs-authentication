const { isEmail } = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        validate: [isEmail,"please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength:[6, "password should have a minlength of 6 characters"],
    }
})

userSchema.pre("save", async function (next) {
    const newSalt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, newSalt)
    next()
})

const user = mongoose.model("user", userSchema)

module.exports = user