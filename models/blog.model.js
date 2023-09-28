const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    username: String,
    title: String,
    content: String,
    category: String,
    date: Date,
    likes: Number,
    comments: [Object]
})

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = { BlogModel }