const express = require('express')
const paymentRouter = express.Router()
const {checkToken} = require('../middlewares/auth')
const paymentController = require('./../controllers/payment')

paymentRouter
    .post('/createpayment',checkToken,paymentController.createPayment)
    .get('/dashboard',checkToken,paymentController.getDataDashboard)
    .patch('/:paymentId',checkToken,paymentController.updatePayment)
    .get('/payment-userId',checkToken,  paymentController.getPaymentByUserId)
    .get('/payment-detail/:id',checkToken,paymentController.getPaymentById)
    .post('/handlemidtrans',paymentController.handleMidtrans)
    // .get('/',  paymentController.getAllProduct)
    .delete('/:paymentId',checkToken,  paymentController.deleteById)



module.exports = paymentRouter