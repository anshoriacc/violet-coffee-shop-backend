// const services = require('./../services/authService')
const response = require("../helper/response");
const productModel = require("./../models/product");

const createProduct = async (req, res) => {
  const image = `${process.env.IMAGE_HOST}${req.file.filename}`;
  const body = req.body;
  body.image = image;
  const {
    name,
    description,
    price,
    size,
    deliveryMethods,
    stock,
    startDelivery,
    endDelivery,
    category,
  } = req.body;
  try {
    const result = await productModel.createProduct(
      name,
      description,
      price,
      size,
      deliveryMethods,
      stock,
      startDelivery,
      endDelivery,
      category,
      image
    );
    return response(res, {
      data: result,
      status: 200,
      massage: "sign up succes",
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

const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await productModel.getProductById(productId);
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

module.exports = { createProduct, getProductById };
