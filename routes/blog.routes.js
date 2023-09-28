const express = require("express")

const jwt = require("jsonwebtoken")

const { BlogModel } = require("../models/blog.model")

const { auth } = require("../middleware/auth.middleware")
const { UserModel } = require("../models/user.model")

const blogRouter = express.Router()

blogRouter.get("/", auth, async (req, res) => {
    let query = {}

    if (req.query.category) {
        query.category = req.query.category;
    } else if (req.query.search) {
        // Handle search functionality (if needed)
        query.title = { $regex: req.query.search, $options: "i" }
    }

    const sort = {};

    if (req.query.sort) {
        if (req.query.sort === "asc") {
            sort.date = 1; // Sort by salary in ascending order
        } else if (req.query.sort === "desc") {
            sort.date = -1; // Sort by salary in descending order
        }
    }



    try {
        const blogs = await BlogModel.find(query).sort(sort);
        res.json(blogs)
    }
    catch (err) {
        res.json(err.message)
    }


})

blogRouter.post("/",auth,async(req,res)=>{
const {username,
    title,
    content,
    category}=req.body

    try{
      const blog = new BlogModel({username,
        title,
        content,
        category,
        date: new Date(),
        likes: 0,
        comments: []})

        await blog.save()
        res.json("blog posted")
    }
    catch(err){
         res.json(err.json)
    }


})

blogRouter.patch("/:id",auth,async(req,res)=>{
    const id = req.params.id
   const payload = req.body
   const token = req.headers.authorization
   //const decoded = await jwt.verify("token",token)

   jwt.verify(token, 'token', async function (err, decoded) {
    if(decoded){
    try{
        const blog = await BlogModel.findOne({_id:id})
        //const user = await UserModel.findOne({_id:decoded.userID})
        if(decoded.userName===blog.username){
           await BlogModel.findByIdAndUpdate({_id:blog._id},payload)
           res.json("blog updated")
        }
        else{
           res.json("Access denied")
        }
      }
      catch(err){
       res.json(err.message)
      }
    }
    else{
        res.json(err.message)
    }
  });
  
  
})

blogRouter.delete("/:id",auth,async(req,res)=>{
    const id = req.params.id
   
   const token = req.headers.authorization
   jwt.verify(token, 'token', async function (err, decoded) {
    if(decoded){
    try{
        const blog = await BlogModel.findOne({_id:id})
        //const user = await UserModel.findOne({_id:decoded.userID})
        if(decoded.userName===blog.username){
           await BlogModel.findByIdAndDelete({_id:blog._id})
           res.json("blog deleted")
        }
        else{
           res.json("Access denied")
        }
      }
      catch(err){
       res.json(err.message)
      }
    }
    else{
        res.json(err.message)
    }
  });
  
})

module.exports = { blogRouter }