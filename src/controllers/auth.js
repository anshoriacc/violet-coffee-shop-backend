// const services = require('./../services/authService')
const response = require('../helper/response')
const authModel = require('./../models/auth')
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const ServiceResponse = require('../helper/ServiceResponse')


const createUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const cekEmail = await authModel.cekEmail(email)
        console.log(cekEmail)
        if (cekEmail.length > 0) return response(res, {
            status: 400,
            massage: "email already used ",
        })
        const passwordHash = await bcrypt.hash(password, 10)
        const result = await authModel.createUser(username, email, passwordHash)
        return response(res, {
            data: result,
            status: 200,
            massage: "sign up succes",
        })
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            massage: "Terjadi Error",
            error
        })
    }
}

// test

module.exports = { createUser }