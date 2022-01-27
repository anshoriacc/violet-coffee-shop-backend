const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/product')
const {fileUpload} = require('../middlewares/upload')

productRouter
    .post('/createproduct',fileUpload,productController.createProduct)
    .get('/:productId',  productController.getProductById)
    .delete('/:productId',  productController.deleteById)



module.exports = productRouter