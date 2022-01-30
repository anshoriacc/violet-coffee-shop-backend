const userModel = require('../models/user')
const response = require('../helper/response')

const editUser = (req, res) => {
    const userInfo = req.userInfo
    let { body } = req
    const file = req.file
    userModel
        .editUser(userInfo, body, file)
        .then(({ status, result }) => {
            response.success(res, status, result)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const editPassword = (req, res) => {
    const userInfo = req.userInfo
    const { body } = req
    userModel
        .editPassword(userInfo, body, file)
        .then(({ status, result }) => {
            response.success(res, status, result)
        }).catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const deleteAccount = (req, res) => {
    const { id } = req.userInfo
    userModel
        .deleteAccount(id)
        .then(({ status, result }) => {
            response.success(res, status, result)
        }).catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

module.exports = {
    deleteAccount,
    editUser,
    editPassword
}