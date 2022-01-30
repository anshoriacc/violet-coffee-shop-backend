const express = require('express')
const testimonieRouter = express.Router()
const testimonieController = require('./../controllers/testimonies')

testimonieRouter
    .get('/',  testimonieController.getTestimoni)
    .post('/',  testimonieController.createTestimonie)



module.exports = testimonieRouter