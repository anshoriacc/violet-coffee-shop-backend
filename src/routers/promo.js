const express = require('express')
const promoRouter = express.Router()
const promoController = require('./../controllers/promo')
const {checkToken} = require('../middlewares/auth')
const {checkRoleAdmin} = require('../middlewares/authorize')
const {fileUpload} = require('../middlewares/upload')

promoRouter
    .post('/createpromo',checkToken,checkRoleAdmin,fileUpload,promoController.createPromo)
    .patch('/:productId',checkToken,checkRoleAdmin,fileUpload,promoController.updatePromo)
    .delete('/:productId',checkToken,  promoController.deletePromoById)



module.exports = promoRouter