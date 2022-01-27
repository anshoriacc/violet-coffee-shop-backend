const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')
const { register } = require('./../middlewares/validate')

authRouter.post('/signup', register, authController.createUser)
// .post('/login', authController.login)
// .delete('/logout',authController.logout)


module.exports = authRouter