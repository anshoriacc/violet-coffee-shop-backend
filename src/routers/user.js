const express = require('express')
const userRouter = express.Router()
const userController = require('./../controllers/user')
const auth = require('./../middlewares/auth')

userRouter.put('/edit/password', auth.checkToken, userController.editPassword)
userRouter.delete('/delete', auth.checkToken, userController.deleteAccount)

module.exports = userRouter