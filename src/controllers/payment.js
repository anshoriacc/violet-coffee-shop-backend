const { response } = require("../helper/response");
const pagination = require("../helper/pagination");
// const productModel = require("../models/product");
const model = require("../models/sequelize/index");
const dayjs = require("dayjs");
const midtransClient = require("midtrans-client");
const { Op } = require("sequelize");

let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_MIDTRANS,
  clientKey: process.env.CLIENT_KEY_MIDTRANS,
});

const paymentMidtrans = async (total_price, bank, order_id) => {
  const parameter = {
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: parseInt(total_price),
      order_id: order_id,
    },
    bank_transfer: {
      bank: bank,
    },
  };
  return await coreApi.charge(parameter);
};

const additionalPriceLIst = {
  R: 0,
  L: 2000,
  XL: 3000,
  "250gr": 0,
  "300gr": 2000,
  "500gr": 3000,
};
const shippingPrice = 10000;
const taxPercent = 0.1;

const createPayment = async (req, res) => {
  const { products, delivery_method, set_time,bank } = req.body;
  const {id} = req.userInfo;
  const order_id = `COFFEE-SHOP-PAYMENT-${dayjs().format("YYm-mss-DD")}`;
  let subTotal = 0;

  try {
    await Promise.all(
      products.map(async (product) => {
        const additionalPrice = additionalPriceLIst[product.size] ?? 0;
        const getProduct = await model.products.findByPk(product.product_id);
        const discount = getProduct.discount/100;
        if (getProduct) {
          await getProduct.update({popular_score: getProduct.popular_score + 1})
          const calculatePrice = getProduct.price * product.quantity + additionalPrice 
          subTotal += calculatePrice - (calculatePrice * discount);
        }
        return getProduct;
      })
    );
    const shipping = delivery_method === "home_delivery" ? shippingPrice : 0;
    const tax = subTotal * taxPercent;
    const total_price=  subTotal + shipping + tax
    const payment = await model.payment.create({
      sub_total: subTotal,
      total_price: subTotal + shipping + tax,
      tax,
      user_id: id, // hardcode dlu
      set_time,
      order_id,
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
    const resMidtrans = await paymentMidtrans(total_price, bank, order_id);
    return response(res, {
      data: {resMidtrans,payment},
      status: 200,
      message: "create payment succes",
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

const handleMidtrans = async (req, res) => {
  const { order_id, transaction_status } = req.body;
  try {
    const result = await model.payment.update(
      { 
        status_order: transaction_status,
       },
      { where: { order_id } }
    );
    return response(res, {
      data: result,
      status: 200,
      message: "payment finish ",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const getPaymentByUserId = async (req, res) => {
  const { id } = req.userInfo;
  console.log(req.userInfo);
  const {per_page,page} = req.query;
  const limit =  parseInt(per_page ?? 10) 
  const offset = parseInt((page ?? 1) * limit) - limit;
  // console.log(limit, offset);
  try {
    // const payment = await model.payment.findAndCountAll({
    //   where: {
    //     user_id: id,
    //   },
    // });

    const paymentItems = await model.payment_item.findAndCountAll({
      where: {
        '$payment.user_id$': id,
      },
      include: [
        {
          model: model.products,
          as: 'product',
          attributes: ['id', 'name', 'price', 'image', 'discount'],
          required: false,
      },
      {
        model: model.payment,
        as: 'payment',
        attributes: []
      }
    ],
      limit:limit,
      offset:offset,
    })
    console.log(paymentItems);

    const buffer = await paymentItems.rows.map((payment) => {
      const container ={...payment.dataValues};
      const product = payment.dataValues.product;
      container.name = product.name;
      container.price = product.price;
      container.image = product.image;
      container.discount = product.discount;

      return container
    });
// console.log(buffer);
    return pagination(res, req, {
      data: buffer,
      total: paymentItems.count,
      status: 200,
      message: "get payment by user id succes",
      limit, offset,
      query: req.query
    });
  } catch (error) {
    return pagination(res, req, {
      status: 500,
      message: "Terjadi Error",
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
    const result = await model.payment_item.destroy({
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

const getDataDashboard =async(req,res)=>{
//  const {userId}=req.params
const days = [
  'Sunday',
  'Monday',
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
// const dateNow= dayjs().startOf('week').format("DD-MM-YYYY")
// const nextDate= dayjs().endOf('week').format("DD-MM-YYYY")
// console.log("start",dateNow)
// console.log("end",nextDate);
 try {
   
const result = await Promise.all(days.map(async(day, index) => {
  const getDay = dayjs().day(index);

  const total = await model.payment.sum("total_price", {
    where: {
      created_at: {
        [Op.between]: [
          getDay.startOf('day').format("YYYY-MM-DD HH:mm:ss"),
          getDay.endOf('day').format("YYYY-MM-DD HH:mm:ss"),
        ]
      }
  },
  });

  return {day, total:total ?? 0};
  
}));
 return response(res, {
  data: {
    result
  },
  status: 200,
  message: "get dashboard success",
});
   
 } catch (error) {
  return response(res, {
    status: 500,
    message: "Terjadi Error",
    error,
  });
 }
}
module.exports = {
  createPayment,
  getPaymentByUserId,
  updatePayment,
  deleteById,
  getPaymentById,
  handleMidtrans,
  getDataDashboard
};
