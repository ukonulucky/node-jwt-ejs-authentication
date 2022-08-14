const jwt = require("jsonwebtoken")



const validateAuth = (req, res, next) => {
    
    const { JWT } = req.cookies
    if ( JWT ) {
        jwt.verify(JWT, "test123", (error, encodedJWT) => {
            if (error) {
                console.log(error)
              res.redirect("/login")
            } else {
                console.log(encodedJWT)
                next()    
          }
        })
    }
    else {
        res.redirect("/login")
    }
    
}

module.exports = validateAuth