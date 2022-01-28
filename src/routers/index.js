const express = require("express")
const mainRouter = express.Router()
// const userRouter = require('./users.js')
const productRouter = require('./product.js')
const paymentRouter = require('./payment.js')
// const historyRouter = require('./history.js')
const authRouter = require('./auth')

mainRouter.use('/product',productRouter)
mainRouter.use('/payment',paymentRouter)
mainRouter.use('/auth', authRouter)

module.exports = mainRouter