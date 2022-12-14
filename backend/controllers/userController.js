
const User = require('../models/userModel') //pull in user model
const jwt = require("jsonwebtoken") // bringing in jwt package


const createToken = (_id) => {
    //.sign takes in 3 argments 1. obj of payload 2. secret key(put in env), 3. experiation date (how long user is logged in for)
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "7d"} )
}


//login user
const loginUserController = async (req, res) =>{

    const { email, password } = req.body

    try{
        const user = await User.login(email, password) //see userModel for static signin method

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUserController = async (req, res) =>{
    const { email, password } = req.body

    try{
        const user = await User.signup(email, password) //see userModel for static signup method

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    loginUserController,
    signupUserController
}

