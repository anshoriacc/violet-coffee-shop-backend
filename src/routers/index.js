const express = require("express")
const mainRouter = express.Router()
const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./product.js')
const paymentRouter = require('./payment.js')
// const historyRouter = require('./history.js')

mainRouter.use('/payment',paymentRouter)
mainRouter.use('/auth', authRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/product', productRouter)
// mainRouter.use('/history',historyRouter)

module.exports = mainRouter