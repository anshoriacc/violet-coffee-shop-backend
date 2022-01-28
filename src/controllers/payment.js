const { response } = require("../helper/response");
// const productModel = require("../models/product");
const model = require("../models/sequelize/index");
const additionalPriceLIst = {
  R: 0,
  L: 2000,
  XL: 3000,
  "250gr": 0,
  "300gr": 2000,
  "500gr": 3000,
};
const shippingPrice = 10000;
const taxPercent = 10;

const createPayment = async (req, res) => {
  const { products, delivery_method, set_time } = req.body;
  let subTotal = 0;

  try {
    await Promise.all(
      products.map(async (product) => {
        const additionalPrice = additionalPriceLIst[product.size] ?? 0;
        const getProduct = await model.products.findByPk(product.product_id);
        if (getProduct) {
          subTotal += getProduct.price * product.quantity + additionalPrice;
        }
        return getProduct;
      })
    );
    const shipping = delivery_method === "home_delivery" ? shippingPrice : 0;
    const tax = subTotal * taxPercent;
    const payment = await model.payment.create({
      sub_total: subTotal,
      total_price: subTotal + shipping + tax,
      tax,
      user_id: 1, // hardcode dlu
      set_time,
    });
    await Promise.all(
      products.map((product) => {
        return model.payment_item.create({
          product_id: product.product_id,
          payment_id: payment.id,
          quantity: product.quantity,
        });
      })
    );
    return response(res, {
      data: payment,
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
        user_id: userId,
      },
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
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.payment.findOne({
      where: {
        id,
      },
      include: [
        {
          model: model.payment_item,
          as: 'payment_item',
          include: [
            {
            model: model.products,
            as: 'product',
            attributes: ['id', 'name', 'price', 'image']
          }
        ]
        }
      ]
    });
    return response(res, {
      data: result,
      status: 200,
      massage: "get payment by id succes",
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
        id: paymentId,
      },
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
  const body = req.body;
  try {
    await model.payment.update(body, {
      where: {
        id: paymentId,
      },
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
module.exports = {
  createPayment,
  getPaymentByUserId,
  updatePayment,
  deleteById,
  getPaymentById
};
