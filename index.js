require("dotenv").config();
require("./connection & Sehema/conn")
const express = require("express");
const hasing = require("bcryptjs")
const app = express();
const PORT =  process.env.PORT
const jwt = require("jsonwebtoken");
const collection = require("./connection & Sehema/Schema")
const path = require("path")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const auth = require('../loginForm/middlware/auth')
app.use(express.urlencoded({ extended: true }));

let static_path = path.join(__dirname,"./frontend")
let template_path = path.join(__dirname,"./templates/views")
let partials_path = path.join(__dirname,"./templates/partials")
app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)


app.get("/", (req,res)=>{
    res.send(`<h1><a href=${`/ragister`}>ragister </a></h1> <h3>OR</h3> <h1><a href=${'/login'}>Login</a></h1>  `)
})
app.get("/ragister",(req,res)=>{
    res.render("ragister")

})

app.post("/ragister",async (req,res)=>{
    try{
  const ragistered = new collection(req.body)

  let data = await  ragistered.save()
  if(data){
   res.redirect("/login")
  }
    }catch(err){
       console.log(err)
    }
  
})
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login",async (req,res)=>{
    try{
   let data = await collection.findOne({email : req.body.email })
   if (!data) {
  return res.status(401).send("Invalid email or password");
}
        let passMetch =await hasing.compare(req.body.password,data.password)
        if(passMetch){
            let jwttoken = jwt.sign(
                {userId : data._id.toString()},
                process.env.JWT ,
             {  expiresIn: '60s'} )  
           
          res.cookie("jwt",jwttoken,{
            maxAge : 60 * 1000,
                httpOnly : true,
                sameSite : "lax",
              
            })
          
                res.redirect("/secure")
            
        }else{
            res.send("envalid password")
        }

    }catch(err){
        res.status(400).send("invalid login detailes")
        
    }
})

app.get("/secure",auth, (req,res)=>{
     res.render("secure")
})

app.listen(PORT,()=>{
    console.log(`port started at ${PORT}`)
})