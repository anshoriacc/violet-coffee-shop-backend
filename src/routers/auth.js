const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')
const { register, login } = require('./../middlewares/validate')

authRouter.post('/signup', register, authController.createUser)
authRouter.post('/login', login, authController.login)
// .post('/login', authController.login)
// .delete('/logout',authController.logout)


module.exports = authRouter