const express = require('express')
const userRouter = express.Router()
const userController = require('./../controllers/user')
const auth = require('./../middlewares/auth')
const { fileUpload } = require('../middlewares/upload')

userRouter.put('/edit/password', auth.checkToken, userController.editPassword)
userRouter.patch('/edit', auth.checkToken, fileUpload, userController.editUser)
userRouter.delete('/delete', auth.checkToken, userController.deleteAccount)

module.exports = userRouter