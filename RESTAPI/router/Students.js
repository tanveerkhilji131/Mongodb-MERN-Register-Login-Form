const express = require("express")
const routerStudent = new express.Router();
let collection = require("../mongo/mongooes") 


 routerStudent.route("/")
   .get(async (req, res) => {
        try {
            let users = await collection.find()
            res.status(200).json({ users })
        }
        catch (err) {
            res.status(400).json({
                status: "Error",
                message: err.message
            })
        }
    })

   .post(async (req, res) => {
        try {
            const result = new collection(req.body);
            await result.save()
            res.status(201).json({
                status: "success",
                user: result
            });

        } catch (err) {
            res.status(400).json({
                status: "error",
                message: err.message
            });
        }

    })
routerStudent.route("/:id")
 .delete(async (req, res) => {
        try {
            let _id = req.params.id
            let userdel = await collection.deleteOne({ _id })
            res.status(200).json({
                status : "user deleted",
                deletedID : _id
            })
        }
        catch(err){
            res.status(400).json({
                status : "error",
                message : err.message
            })
        }
    })
.put(async (req,res)=>{
    try{
   let _id = req.params.id;
   let user = await collection.findByIdAndUpdate({_id},{$set: req.body})
        res.status(200).json({
            status : "updated",
            updateUser : user._id
        })
    }catch(err){
        res.status(400).json({
            status : "Error",
            message : err.message
        })
    }
})
.patch(async (req, res) => {
    try{
    let _id = req.params.id;
    let updatedata = await collection.findByIdAndUpdate({_id},{$set: req.body})
    res.status(200).json({
        status : `user data updated`,
        updatedID: updatedata._id
    })
    }catch(err){
        res.status(400).json({
            status : "Error",
            message : err.message
        })
    }
})
.get(async (req,res)=>{
   try{
     let _id = req.params.id;
    let user = await collection.findById({_id})
    res.status(200).send(user)
   }catch(err){
    res.status(400).json({
        status : "Error",
        message : err.message
    })
   }
})

module.exports = routerStudent