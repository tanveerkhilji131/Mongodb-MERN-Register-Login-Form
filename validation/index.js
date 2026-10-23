// import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/tanveer")
// .then(()=> console.log("mongooes connected"))
// .catch((err)=> console.log(`error = ${err}`))

// let Structure  = new mongoose.Schema({
//     name : {
//         type : String,
//         required : true
//     },
//     age : {
//         type : Number,
//         required : true
//     },
//     from : {
//         type : String,
//         default : "india"
//     }
  
    

// })

// let collection = new mongoose.model("Profile",Structure)

// let document = new collection({
// name : "tanveer",
// age : 20,
// from : "jodhpur rajsthan"
// })

// document.save()

import mongoose from "mongoose";
import validator from "validator";
mongoose.connect("mongodb://127.0.0.1:27017/tanveer-dbs")
.then(()=>console.log("mongoose connected"))
.catch((err)=>console.log("error = ",err))
let Structure = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true ,
        minlength : [4,"your error is your name length set min is 4 but you write less then 4"],
        maxlength : 12,
    validate : function(v){               //firstway
            return !v.includes("admin")
        }
        ,
        // validate :{                     //secondway
        //     validator : function(v){
        //         return !v.includes("admin")
        //     },
        //     message : "admin not allowed pls enter your real Name"
        // }
       
    },
    age : {
        type : Number,
        required : true,
        min : 18,
        max : 40,
        
    },
    job :{
        type : String,
        lowercase : true,
        trim  : true,
         required : true,
         enum : ["frontend","backend","database"]
    },
    email : {
        type : String,
        validate(v){
           if(!validator.isEmail(v)){
            throw new Error("your email is invalid")
           }
        }
    }

},{timestamps : true})

let collection = mongoose.model("users",Structure)

 async function createDoc(){
try{
let userData = await collection.find()
console.log(userData)

let newdata = collection({
    name : "gojo",
    age : 20,
    job : "frontend     ",
    email : "tk@gmail.com"
})
let newdoucment = await newdata.save();
console.log(newdoucment)

}

catch(err){
    console.log(err)
}
}
createDoc()


let deletedoucment = async (_id)=>{
    try{
  let deletedUser = await collection.findByIdAndDelete({_id})

       if (deletedUser) {
            console.log('Deleted user:', deletedUser);
        } else {
            console.log('User not found');
        }
    }catch(err){
        console.log(err)
    }
  
}
// deletedoucment('6acf075bed14e9c9ac12c904')