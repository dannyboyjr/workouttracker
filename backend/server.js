require('dotenv').config()
const express = require("express")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")



const app = express()
const mongoose = require("mongoose")

//middleware
app.use(express.json()) //parses Json to req. so basically you can use req.body

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use("/api/workouts",workoutRoutes)
app.use("/api/user",userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen to request
    console.log()
    app.listen(process.env.PORT, () =>{
        console.log(" connceted to db...listening on port:", process.env.PORT)
    })
})
.catch((err)=> console.log(err))



