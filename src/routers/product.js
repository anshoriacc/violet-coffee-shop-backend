const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/product')
const {fileUpload} = require('../middlewares/upload')

productRouter
    .post('/createproduct',fileUpload,productController.createProduct)
    .patch('/:productId',fileUpload,productController.updateProduct)
    .get('/:productId',  productController.getProductById)
    .get('/',  productController.getAllProduct)
    .delete('/:productId',  productController.deleteById)



module.exports = productRouter