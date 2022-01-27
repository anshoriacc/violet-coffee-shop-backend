const response = require('../helper/response')
const authModel = require('./../models/auth')
const jwt = require("jsonwebtoken");



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
    const authHeader = req.headers["x-access-token"]

    const jwtOptions = {
        expiresIn: "1s",
    }

    jwt.sign(authHeader, "", jwtOptions, (logout) => {
        if (logout) {
            res.send({ msg: 'You have been Logged Out' });
        } else {
            res.send({ msg: 'Error' });
        }
    });
}

module.exports = { createUser, login, logout }