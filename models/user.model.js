const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type:String, unique:true},
    avatar: String,
    email: {type:String, unique:true},
    password: String
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {UserModel}