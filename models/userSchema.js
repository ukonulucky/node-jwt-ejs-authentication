const { isEmail } = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    emailInput: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        validate: [isEmail,"please enter a valid email"]
    },
    passwordInput: {
        type: String,
        required: [true, "password is required"],
        minlength:[6, "password should have a minlength of 6 characters"],
    }
})
// finding for the uniqueness of email
userSchema.path("emailInput").validate(async(emailInput) => {
    const res = await mongoose.models.user.countDocuments({ emailInput })
    return !res
}, "Email all ready exist")


userSchema.pre("save", async function (next) {
    const newSalt = await bcrypt.genSalt()
    this.passwordInput = await bcrypt.hash(this.passwordInput, newSalt)
    next()
})


// creating a mongoose static method

userSchema.statics.login =  async function(emailInput, passwordInput){
    const user = await this.findOne({ emailInput })
    if (user) {
        const res = await bcrypt.compare(passwordInput, user.passwordInput)
        if (res) {
            return user
        }
        else {
            throw Error("incorrect password")
        }
    }
    throw Error("email does nnot exist")

}


const user = mongoose.model("user", userSchema)



module.exports = user