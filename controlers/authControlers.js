const user = require("../models/userSchema")

const signup_get = (req, res) => {
  res.render("signup")
}

const signup_post = async(req,res) => {
   try {
       const { email, password } = req.body
       const newUser = new user({ email, password })
     const newUserResponse =  await newUser.save()
           res.status(201).json(newUserResponse)
     
   } catch (error) {
     res.status(400).json(error.message)
   }
}

const login_post = (req,res) => {
    res.send("jusut logged in")
}

const login_get = (req,res) => {
    res.render("login")
}

module.exports = {signup_get, signup_post, login_get, login_post}