const userModel = require('../models/user')
const response = require('../helper/response')

const deleteAccount = (req, res) => {
    const { id } = req.userInfo;
    userModel
        .deleteAccount(id)
        .then(({ status, result }) => {
            response.success(res, status, result)
        }).catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

module.exports = {
    deleteAccount
}