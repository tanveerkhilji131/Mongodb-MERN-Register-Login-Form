let validator = require("validator")
let mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Students")
.then(()=> console.log("mongoose connected"))
.catch((err)=>console.log(err))  

let Sechema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        minlength : 4,
        maxlength : 20,
        lowercase : true
    },
    age : {
        type : Number,
        min : 15,
        max : 30
    },
    email : {
        type : String,
        lowercase: true,
        unique : true,
        validate : function(v){
            if(!validator.isEmail(v)){
                throw new Error("your email is envaid")
            }
        }
    }
},{timestamps : true})
let collection =new  mongoose.model("users",Sechema);


module.exports = collection