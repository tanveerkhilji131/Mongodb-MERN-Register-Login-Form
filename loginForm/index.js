require("dotenv").config();
require("./connection & Sehema/conn")
const express = require("express");
const hasing = require("bcryptjs")
const app = express();
const PORT =  process.env.PORT || 2000
const jwt = require("jsonwebtoken");
// const userRouter = require("./router/Users")
const collection = require("./connection & Sehema/Schema")
const path = require("path")
const hbs = require("hbs")
const cookies = require("cookie-parser")
app.use(express.urlencoded({ extended: true }));

let static_path = path.join(__dirname,"./frontend")
let template_path = path.join(__dirname,"./templates/views")
let partials_path = path.join(__dirname,"./templates/partials")

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)


app.get("/",async (req,res)=>{
    res.render("index")
})
app.get("/ragister",(req,res)=>{
    res.render("ragister")

})

app.post("/ragister",async (req,res)=>{
    try{
  const ragistered = new collection(req.body)
//   const tokengenrator = await ragistered.tokenGen();
//   console.log('token is = ' , tokengenrator)
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
                process.env.JWT  )
           
            res.cookie("jwt",jwttoken,{
                expires : new Date(Date.now() + 30000),
                httpOnly : true
            })
            res.status(201).send("succesfully login")
        }else{
            res.send("envalid password")
        }

    }catch(err){
        res.status(400).send("invalid login detailes")
        
    }
})


app.post("/secure",async (req,res)=>{
    try{
        let checkcookie = await req.cookies.jwt;
        console.log(checkcookie)
        if(!checkcookie){
            res.send("cookie not avilabe pls login")
        }
        res.render("secure")
    }catch(err){
        res.status(404).json({status : "error", message : err.message})
    }
})
app.get("/secure",  (req,res)=>{
   
    res.render("secure")
})

app.listen(PORT,()=>{
    console.log(`port started at ${PORT}`)
})