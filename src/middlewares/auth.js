const jwt = require("jsonwebtoken");
const httpResponse = require("../helper/response");
const authModel = require('./../models/authModel')

const checkToken = async (req, res, next) => {
  const token = req.header("x-access-token");
  const cekWhiteListToken = await authModel.cekWhiteListToken(token)
  if (cekWhiteListToken.length === 0) { return httpResponse(res, { status: 403, message: "you already logout" }); }
  //   const jwtOptions = {
  //     issuer: process.env.ISSUER,
  //   };
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return httpResponse(res, { status: 403, message: "token expired" });
    const { id, name, role } = payload;
    req.userInfo = { id, name, role };
    next();
  });
  //   next();
};

module.exports = { checkToken };