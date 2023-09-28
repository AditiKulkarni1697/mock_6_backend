const express = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {UserModel} = require("../models/user.model")

const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
    try{
      const users = await UserModel.find()
      res.json(users)
    }
    catch(err){
        res.json(err.message)
    }
})

userRouter.post("/register",async(req,res)=>{
    const {name,avatar,email,password}=req.body

    bcrypt.hash(password, 8,async(err,hash)=>{
     if(hash){
        
        try{
           const user = new UserModel({name, avatar,email,password:hash})
           await user.save()
           res.json("User registered")
        }
        catch(err){
            res.json(err.message)
        }

     }
     else{
        res.json(err.message)
     }
    })
    
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
    const user = await UserModel.findOne({email:email})
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
           const token = jwt.sign({userID:user._id, username:user.name},"token")
            res.json({
                msg:"Siggned in",
                token: token,
                username: user.name,
                userimg: user.avatar
            })

        }
        else{
           res.json(err.message)
        }
    })
    }
    catch(err){
      res.json(err.message)
    }
   
})

module.exports = {userRouter}