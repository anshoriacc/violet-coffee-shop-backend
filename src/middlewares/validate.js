const httpResponse = require("../helper/response");

const register = (req, res, next) => {
  const { body } = req;
  const registerBody = ['email', 'password', 'phone'];
  const bodyProperty = Object.keys(body);
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0 ? true : false;
  if (!isBodyValid) return httpResponse(res, 400, "Invalid Body");
  next();
};

module.exports = { register };