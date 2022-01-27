const express = require("express")
const mainRouter = express.Router()
// const userRouter = require('./users.js')
const productRouter = require('./product.js')
// const historyRouter = require('./history.js')
const authRouter = require('./auth.js')

// mainRouter.use('/users', userRouter)
mainRouter.use('/product',productRouter)
// mainRouter.use('/history',historyRouter)
mainRouter.use('/auth',authRouter)

module.exports = mainRouter