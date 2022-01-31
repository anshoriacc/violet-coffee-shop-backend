const response = require('../helper/response')
const authModel = require('./../models/auth')

const createUser = (req, res) => {
    const { body } = req
    authModel
        .createUser(body)
        .then(({ status, result }) => {
            const objectResponse = {
                id: result.insertId,
                name: body.email,
                phone: body.phone
            }
            response.success(res, status, objectResponse)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const login = (req, res) => {
    const { body } = req
    authModel
        .signIn(body)
        .then(({ status, result }) => {
            response.success(res, status, result)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const logout = (req, res) => {
    const token = req.header("x-access-token")
    authModel
        .logout(token)
        .then(({ status, result }) => {
            response.success(res, status, result)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const forgotPassword = (req, res) => {
    const token = req.header("x-access-token")
    authModel
        .logout(token)
        .then(({ status, result }) => {
            response.success(res, status, result)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

module.exports = { createUser, login, logout,forgotPassword }