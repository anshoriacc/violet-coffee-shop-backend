const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/product')
const {fileUpload} = require('../middlewares/upload')

productRouter
    .post('/createproduct',fileUpload,productController.createProduct)


module.exports = productRouter