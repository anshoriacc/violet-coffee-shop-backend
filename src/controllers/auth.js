// const services = require('./../services/authService')
const response = require('../helper/response')
const authModel = require('./../models/auth')
// const jwt = require("jsonwebtoken");
// const ServiceResponse = require('../helper/ServiceResponse')


const createUser = (req, res) => {
    const { body } = req
    authModel
        .createUser(body)
        .then((result)  => {
            response(res, { data: result, status: 200, message: 'Sign Up Success' })
        })
        .catch( (error) => {
            response(res, { status: 500, message: 'Terjadi Error', error })
        })
}

// test

module.exports = { createUser }