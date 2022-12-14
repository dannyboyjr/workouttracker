const express = require("express")
const { loginUserController, signupUserController } = require("../controllers/userController")

const router = express.Router()

//login route
router.post('/login', loginUserController )

//signup route
router.post('/signup', signupUserController)

module.exports = router