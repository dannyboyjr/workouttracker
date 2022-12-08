const Workout = require('../models/workoutModel')
const mongoose = require("mongoose")


//get all workouts
const getAllWorkoutsController = async (req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200)
    .json(workouts)
}

//get a single workout
const getWorkoutByIdController = async (req, res, next) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout){
    res.status(404).json({error: "Workout doesn't exist"})
    next()

    }

    res.status(200)
    .json(workout)

}

//POST a new workout
const createWorkoutController = async (req, res)=>{
    const {title, load, reps} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try{
        const workout = await Workout.create({
            title,
            load,
            reps
        })
        res.status(200)
        .json(workout)
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a single workout
const deleteWorkoutController = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }

//edit single workout
const updateWorkoutController = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: "Workout doesn't exist"})
    }

    res.status(200).json()
    .json(workout)
}


module.exports ={
    createWorkoutController,
    getAllWorkoutsController,
    getWorkoutByIdController,
    deleteWorkoutController,
    updateWorkoutController
}