const express = require('express')
const paymentRouter = express.Router()
const paymentController = require('./../controllers/payment')

paymentRouter
    .post('/createpayment',paymentController.createPayment)
    .patch('/:paymentId',paymentController.updatePayment)
    .get('/:userId',  paymentController.getPaymentByUserId)
    // .get('/',  paymentController.getAllProduct)
    .delete('/:paymentId',  paymentController.deleteById)



module.exports = paymentRouter