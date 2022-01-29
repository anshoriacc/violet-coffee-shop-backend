const model = require("../models/sequelize/index");
const { response } = require("../helper/response");

const getTestimoni = async (req, res) => {
    try {
      const result = await model.testimonies.findAll(
        {
          include:[
            {
              model:model.users,
              as:"author",
              attributes:[
                "display_name","image","delivery_adress"
              ]
            }
          ]
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

  const createTestimonie = async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const result = await model.testimonies.create(body);
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

  module.exports = {getTestimoni ,createTestimonie}