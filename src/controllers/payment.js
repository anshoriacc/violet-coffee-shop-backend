const {response} = require("../helper/response");
// const productModel = require("../models/product");
const model = require('../models/sequelize/index');

const createPayment = async (req, res) => {
    const body = req.body;
    console.log(body);
    body.total_price = parseInt(body.total_price);
    try {
      const result = await model.payment.create(body);
      return response(res, {
        data: result,
        status: 200,
        massage: "create payment succes",
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
  const getPaymentByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await model.payment.findAll({
        where: {
          user_id: userId
        }
      });
      return response(res, {
        data: result,
        status: 200,
        massage: "get payment by user id succes",
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

  const deleteById = async (req, res) => {
    const { paymentId } = req.params;
    try {
      const result = await model.payment.destroy({
        where: {
          id: paymentId
        }
      });
      return response(res, {
        data: result,
        status: 200,
        massage: "get payment by user id succes",
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

  const updatePayment = async (req, res) => {
    const { paymentId } = req.params;
    const body = req.body
    try {
      await model.payment.update(body, {
        where: {
          id: paymentId
        }
      });
      return response(res, {
        data: null,
        status: 200,
        massage: "update payment by id succes",
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
  module.exports = { createPayment,getPaymentByUserId, updatePayment, deleteById};