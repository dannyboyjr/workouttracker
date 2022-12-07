const express = require("express")

const { 
        createWorkoutController, 
        getAllWorkoutsController,
        getWorkoutByIdController,
        deleteWorkoutController,
        updateWorkoutController
    } = require("../controllers/workoutController")

const router = express.Router()



//Get all Workouts 
router.get("/", getAllWorkoutsController)
//get workout by id
router.get("/:id", getWorkoutByIdController)
//POST a new workout
router.post('/', createWorkoutController)
//DELETE an existing workout
router.delete("/:id", deleteWorkoutController)
//UPDATE an existing workout
router.patch("/:id",updateWorkoutController)



module.exports = router