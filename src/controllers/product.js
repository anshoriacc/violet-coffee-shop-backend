// const services = require('./../services/authService')
const {response} = require("../helper/response");
// const productModel = require("../models/product");
const model = require('../models/sequelize/index');

// const createProduct = async (req, res) => {
//   const image = `${process.env.IMAGE_HOST}${req.file.filename}`;
//   const body = req.body;
//   body.image = image;
//   const {
//     name,
//     description,
//     price,
//     size,
//     deliveryMethods,
//     stock,
//     startDelivery,
//     endDelivery,
//     category,
//   } = req.body;
//   try {
//     const result = await productModel.createProduct(
//       name,
//       description,
//       price,
//       size,
//       deliveryMethods,
//       stock,
//       startDelivery,
//       endDelivery,
//       category,
//       image
//     );
//     return response(res, {
//       data: result,
//       status: 200,
//       massage: "sign up succes",
//     });
//     // httpResponse(res, await services.createUser(req.body));
//   } catch (error) {
//     return response(res, {
//       status: 500,
//       massage: "Terjadi Error",
//       error,
//     });
//   }
// };

const createProduct = async (req, res) => {
  const image = req.file?.filename ? `${process.env.IMAGE_HOST}${req.file.filename}` : null;
  const body = req.body;
  body.image = image;
  body.price = parseInt(body.price);
  console.log(body);
  try {
    const result = await model.products.create(body);
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

// const getProductById = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const result = await productModel.getProductById(productId);
//     return response(res, {
//       data: result,
//       status: 200,
//       massage: "get product by id succes",
//     });
//     // httpResponse(res, await services.createUser(req.body));
//   } catch (error) {
//     return response(res, {
//       status: 500,
//       massage: "Terjadi Error",
//       error,
//     });
//   }
// };


const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await model.products.findOne({
      where: {
        id: productId
      }
    });
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
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const body = req.body
  try {
    await model.products.update(body, {
      where: {
        id: productId
      }
    });
    return response(res, {
      data: null,
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

const deleteById = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await model.products.destroy({
      where: {
        id: productId
      }
    });
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

const getAllProduct = async (req, res) => {
  try {
    const result = await model.products.findAll();
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

// const deleteById = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const result = await productModel.deleteById(productId);
//     return response(res, {
//       data: result,
//       status: 200,
//       massage: "delete by id succes",
//     });
//     // httpResponse(res, await services.createUser(req.body));
//   } catch (error) {
//     return response(res, {
//       status: 500,
//       massage: "Terjadi Error",
//       error,
//     });
//   }
// };

module.exports = { createProduct, getProductById,deleteById, getAllProduct ,updateProduct };
