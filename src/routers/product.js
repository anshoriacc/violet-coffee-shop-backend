const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/product')
const {checkToken} = require('../middlewares/auth')
const {checkRoleAdmin} = require('../middlewares/authorize')
const {fileUpload} = require('../middlewares/upload')

productRouter
    .post('/createproduct',checkToken,checkRoleAdmin,fileUpload,productController.createProduct)
    .patch('/:productId',checkToken,checkRoleAdmin,fileUpload,productController.updateProduct)
    .get('/:productId', productController.getProductById)
    .get('/',  productController.getAllProduct)
    .delete('/:productId',checkToken,  productController.deleteById)



module.exports = productRouter