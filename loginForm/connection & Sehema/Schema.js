const mongoose = require("./conn")
const validation = require("validator")
const bcryptjs = require("bcryptjs")
let SehemaSignUp = new mongoose.Schema({
     name : {
        type : String,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        unique : true,
        required : true ,
        validate(v){
            if(!validation.isEmail(v)){
                throw new Error("Email Invalid")
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    }
})

// SehemaSignUp.methods.tokenGen = async function(){
// try{
//     let token = await jwt.sign({_id : this._id.toString()},tanveerkhiljitk)
// this.tokens = this.tokens.concat({token})
// await this.save()
// return token;
// }catch(err){
//     console.log("error hai = " , err)
// }
// }
SehemaSignUp.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`current pass = ${this.password}`)
       this.password = await bcryptjs.hash(this.password,10)
        console.log(`current pass = ${this.password}`)

    }
      
})
let collectionUsers = new mongoose.model("Register",SehemaSignUp)
 
module.exports = collectionUsers