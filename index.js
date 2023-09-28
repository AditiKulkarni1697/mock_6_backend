const express = require("express")

const {connection} = require("./db")

var cors = require("cors")

const {userRouter} = require("./routes/user.routes")

const {blogRouter} = require("./routes/blog.routes")

const app = express()

app.use(express.json())

app.options('*', cors())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


app.get("/",async(req,res)=>{
    res.send("welcome")
})

app.use("/user", userRouter)

app.use("/blog", blogRouter)

app.listen(8080,async()=>{
    try{
      await connection
      console.log("server is connected to db")
    }
    catch(err){
       console.log(err.message)
    }
  console.log("server is running at port 8080")
})