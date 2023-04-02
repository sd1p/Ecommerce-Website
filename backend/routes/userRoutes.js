const express =require('express')
const { registerUser, check, loginUser, logoutUser } = require('../controllers/userController')
const router= express.Router()

router.route("/register").post(registerUser).get(check)
router.route("/login").post(loginUser)
router.route('/logout').get(logoutUser)


module.exports= router