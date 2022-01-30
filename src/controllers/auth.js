const response = require('../helper/response')
const authModel = require('./../models/auth')

const register = (req, res) => {
    const { body } = req
    authModel
        .register(body)
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
        .login(body)
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

module.exports = { register, login, logout }