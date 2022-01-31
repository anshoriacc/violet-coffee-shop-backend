const userModel = require('../models/user')
// const response = require('../helper/response')
const model = require("../models/sequelize/index");
const { response } = require("../helper/response");


const getUserSequilize = async (req, res) => {
    const {id} = req.userInfo
    try {
      const result = await model.users.findOne(
          {
              where:id,
              attributes: ['id', 'email','phone','delivery_adress','gender','display_name','first_name','image']
        }
      );
      return response(res, {
        data: result,
        status: 200,
        massage: "get product by id succes",
      });
      // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
      return response(res, {
        status: 500,
        massage: "Terjadi Error",
        error,
      });
    }
  };

const detailPersonal = (req, res) => {
    const userInfo = req.userInfo
    userModel
        .detailPersonal(userInfo)
        .then(({ status, result }) => {
            response.success(res, status, result)
        })
        .catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

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
        .editPassword(userInfo, body)
        .then(({ status, result }) => {
            response.success(res, status, result)
        }).catch(({ status, err }) => {
            response.error(res, status, err)
        })
}

const removePhoto = (req, res) => {
    const userInfo = req.userInfo
    userModel
        .removePhoto(userInfo)
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
    getUserSequilize,
    detailPersonal,
    deleteAccount,
    editUser,
    removePhoto,
    editPassword
}