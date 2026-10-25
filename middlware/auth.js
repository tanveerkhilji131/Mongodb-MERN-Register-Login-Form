const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const express = require("express")
const app = express()
app.use(cookieparser())
const auth = async (req,res,next)=>{
 
   let checkCookie = req.cookies?.jwt;
  
    if(!checkCookie){
      return  res.send("pls login")
    }
  
  try{
    let verifytoken = jwt.verify(checkCookie,process.env.JWT)
    // res.render("secure")
    next()

  }catch(err){
   res.clearCookie("jwt",{
    httpOnly : true,
    sameSite : 'lax',
    secure : process.env.Node_ENV = "production"
   })
   if(err.name == "TokenExpiredError"){
    return res.status(401).send(
        `your cookie is expire pls <a href=${"/login"}>login</a> first `
    )
   }
   return res.status(401).send(
    "Invalid token ,pls login"
   )
  
  }
   
}

module.exports = auth;