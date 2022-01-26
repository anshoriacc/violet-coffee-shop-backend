const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')
const {register} = require('./../middlewares/validate')

authRouter
    // .post('/login', authController.login)
    .post('/signup', register,authController.createUser)
    // .delete('/logout',authController.logout)


module.exports = authRouter