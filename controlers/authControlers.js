const user = require("../models/userSchema")
const jwt = require("jsonwebtoken")

// creating a function to handle the errors
const handleError = (err) => {
  const generatedError = {
    emailInput: "", 
    passwordInput: "",
    
  }
  if (err.message.includes("user validation failed")) {
    errorArray = Object.values(err.errors)
    errorArray.map((i) => {
         generatedError[i.properties.path] = i.properties.message
    })
  }
  if (err.code) {
    console.log(err.code)
    generatedError["emailInput"] = "email allready exist"
  }
  return generatedError
 
}
const maxAge =  60 * 24
const createJWT = (id) => {
  return jwt.sign({ id }, "test123", {
    expiresIn: maxAge
  } )
}
const signup_get = (req, res) => {
  res.render("signup")
}

const signup_post = async (req, res) => {
  try {

    const { emailInput, passwordInput } = req.body
    const newUserResponse = await user.create({ emailInput, passwordInput})
    console.log(newUserResponse)
    const token = createJWT(newUserResponse._id)
    console.log(token)
    res.cookie('JWT', token, {
         maxAge: maxAge * 1000
    })
    res.status(201).json(newUserResponse._id)
    console.log(newUserResponse)
   } catch (error) {
     const errObject = handleError(error)
    res.status(400).json(errObject)
   }
}

const login_post = async (req,res) => {
  try {
    console.log(req.body)
    const { emailInput, passwordInput }= req.body
     const userFound = await user.login(emailInput,passwordInput)
    const token = createJWT(userFound._id) 
    res.cookie("JWT", token,
      {
        maxAge: maxAge * 1000,
        httpOnly: true
      })
    
    res.status(201).json(userFound._id)
   } catch (error) {
    res.status(400).json({error:error.message})
   }
}

const login_get = (req,res) => {
    res.render("login")
}

module.exports = {signup_get, signup_post, login_get, login_post}