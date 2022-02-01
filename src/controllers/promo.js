const { response } = require("../helper/response");
const model = require("../models/sequelize/index");



const createPromo = async (req, res) => {
  const image = req.file?.filename
    ? `${process.env.IMAGE_HOST}${req.file.filename}`
    : null;
  const body = req.body;
  body.image = image;
  body.price = parseInt(body.price);
  try {
    const result = await model.products.create(body);
    if (body.variants) {
      await Promise.all(body.variants.map( async (variant) => {
        return await model.variants.create({
          product_id: result.id,
          variant
        });
      }));
    }
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

const updatePromo = async (req, res) => {
  const { productId } = req.params;
  const image = req.file?.filename
    ? `${process.env.IMAGE_HOST}${req.file.filename}`
    : null;
  const body = req.body;
  body.image = image;
  body.price = parseInt(body.price);
  try {
    await model.products.update(body, {
      where: {
        id: productId,
      },
    });
    if (body.variants) {
      await model.variants.destroy({where:{product_id:productId}})
      await Promise.all(body.variants.map( async (variant) => {
        return await model.variants.create({
          product_id: productId,
          variant
        });
      }));
    }
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

const deletePromoById = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await model.products.destroy({
      where: {
        id: productId,
      },
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


module.exports = {
  createPromo,
  deletePromoById,
  updatePromo,
};
