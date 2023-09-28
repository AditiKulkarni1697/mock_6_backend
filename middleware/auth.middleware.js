const express = require("express")

const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{

    const token = req.headers.authorization

    //console.log(token)

    const decoded = await jwt.verify(token,"token")

   // console.log(decoded)

    if(!token){
        res.json("Please log in")
    }
    else{
   next()

}
}

module.exports = {auth}