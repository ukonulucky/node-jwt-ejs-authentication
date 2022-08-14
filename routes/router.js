const { Router } = require("express")
const { signup_get, signup_post, login_get, login_post } = require("../controlers/authControlers")


const router = Router()

// login post rout

router.post("/login", login_post)

// login get route

router.get("/login", login_get)
//signup post route

router.post("/signup", signup_post)

// signup get route

router.get("/signup", signup_get)

module.exports = router