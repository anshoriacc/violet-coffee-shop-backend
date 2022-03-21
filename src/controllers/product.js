// const services = require('./../services/authService')
const { response } = require("../helper/response");
const pagination = require("../helper/pagination");
// const productModel = require("../models/product");
const model = require("../models/sequelize/index");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

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
      message: "create product succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
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
        id: productId,
      },
      include: [
        {
          model: model.variants,
          as: 'variants',
          attributes: ['id',"variant"],
          required: false,
      },]
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
  const image = req.file?.filename
    ? `${process.env.IMAGE_HOST}${req.file.filename}`
    : null;
  const body = req.body;
  if(image !== null){
    body.image = image;
  }
  if(body.price){

    body.price = parseInt(body.price);
  }
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

const deleteById = async (req, res) => {
  const { productId } = req.params;
  try {
    await model.variants.destroy({
      where: {
        product_id: productId,
      },
    });
    await model.payment_item.destroy({
      where: {
        product_id: productId,
      },
    });
    const result = await model.products.destroy({
      where: {
        id: productId,
      },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "delete product by id succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const getAllProduct = async (req, res) => {
  const { per_page, page, search, category, code_promo } = req.query;
  let { sortBy, sort} = req.query;
  const where = {};
  const whereOr = [];
  const limit = parseInt(per_page ?? 10);
  const offset = parseInt((page ?? 1) * limit) - limit;
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  if (code_promo) {
    whereOr.push({[Op.and]: [
      {
        code_promo
      },
      {
        start_promo: {
        [Op.lte]: now
      }
    },
    {
      end_promo: {
      [Op.gte]: now
    }
  }
]}) 
  } else {
    where.code_promo = null;
  }

  if (search) {
    whereOr.push({
      name: {
        [Op.like]: `%${search}%`,
      },
    },
    {
      category: {
        [Op.like]: `%${search}%`,
      },
    }) 
  }
  if (category) {
    if (category === 'favorite') {
      sortBy = 'popular_score';
      sort = 'DESC';
    } else {
      where.category = category;
    }
  }
  if (whereOr.length !== 0) where[Op.or] = whereOr
  console.log(where);
  try {
    const result = await model.products.findAndCountAll({
      where,
      include:[
        {
          model:model.variants,
          as:"variants",
          required: false,
        }
      ],
      limit: limit,
      offset: offset,
      order: [[sortBy ?? 'createdAt', sort ?? 'DESC']]
    });
    return pagination(res, req, {
      data: result.rows,
      total: result.count,
      status: 200,
      massage: "get product succes",
      limit,
      offset,
      query: req.query,
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
  createProduct,
  getProductById,
  deleteById,
  getAllProduct,
  updateProduct,
};
