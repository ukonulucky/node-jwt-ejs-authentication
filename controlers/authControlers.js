const user = require("../models/userSchema")


// creating a function to handle the errors
const handleError = (err) => {
  
  const generatedError = {
    email: "", 
    password: "",
    
  }
  if (err.message.includes("user validation failed")) {
    errorArray = Object.values(err.errors)
    errorArray.map((i) => {
         generatedError[i.properties.path] = i.properties.message
    })
  }
  if (err.code) {
    generatedError["email"] = "email allready exist"
  }
  return generatedError
 
}

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
     const errObject = handleError(error)
     res.status(400).json(errObject)
   }
}

const login_post = (req,res) => {
    res.send("jusut logged in")
}

const login_get = (req,res) => {
    res.render("login")
}

module.exports = {signup_get, signup_post, login_get, login_post}