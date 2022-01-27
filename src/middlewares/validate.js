const httpResponse = require("../helper/response");

const register = (req, res, next) => {
  // validasi body
  const { body } = req;
  const registerBody = ["username", "email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0
      ? true
      : false;
  // console.log(isBodyValid);
  if (!isBodyValid) return httpResponse(res, {status: 400, message: "Invalid Body"});
  next();
};

module.exports = { register };