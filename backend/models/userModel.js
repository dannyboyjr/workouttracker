const mongoose = require('mongoose')
const bcrypt = require("bcrypt") //for hasing/salting passwords
const validator = require("validator") //from npm i validator

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }

})

//make static signup method for hashing salting password (see use case in controller)
userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password) {
        throw Error("email and password are required")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    const checkIfUserExists = await this.findOne({ email }) //note can't use arrow func when using this.
    if(checkIfUserExists){
        throw Error('email already in use')
    }

    //hash and salt password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash})

    return user
}

//static login Method
userSchema.statics.login = async function(email, password){

    if(!email || !password) {
        throw Error("email and password are required")
    }

    const user = await this.findOne({ email }) //note can't use arrow func when using this.
    if(!user){
        throw Error('Incorrect login info')
    }

    const match = await bcrypt.compare(password, user.password) // comparing regular pasword and encrypted one

    if(!match) {
        throw Error('Incorrect login info')
    }
    return user
}

module.exports = mongoose.model("User", userSchema)