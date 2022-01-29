const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')
const { register, login } = require('./../middlewares/validate')
const auth = require('../middlewares/auth')

authRouter.post('/signup', register, authController.createUser)
authRouter.post('/login', login, authController.login)
authRouter.delete('/logout', auth.checkToken, authController.logout)

module.exports = authRouter