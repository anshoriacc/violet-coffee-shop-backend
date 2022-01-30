const express = require('express')
const paymentRouter = express.Router()
const {checkToken} = require('../middlewares/auth')
const paymentController = require('./../controllers/payment')

paymentRouter
    .post('/createpayment',checkToken,paymentController.createPayment)
    .patch('/:paymentId',checkToken,paymentController.updatePayment)
    .get('/:userId',checkToken,  paymentController.getPaymentByUserId)
    .get('/payment-detail/:id',checkToken,paymentController.getPaymentById)
    // .get('/',  paymentController.getAllProduct)
    .delete('/:paymentId',checkToken,  paymentController.deleteById)



module.exports = paymentRouter