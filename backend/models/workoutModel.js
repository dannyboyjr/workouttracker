const mongoose = require("mongoose");

const Schema = mongoose.Schema

//create workout SCHEMA (Part 1) - pt2 is to create the model down below
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})


//part 2: create and export workout model! notice how we named it singluar? kind of like sequlize model:generate
//this creates a collection within MONGO..
module.exports = mongoose.model('Workout', workoutSchema)

