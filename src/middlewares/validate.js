const { response } = require("../helper/response");

const register = (req, res, next) => {
  const { body } = req
  const registerBody = ['email', 'password', 'phone']
  const bodyProperty = Object.keys(body)
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0 ? true : false
  if (!isBodyValid) return response(res, { status: 400, message: "Invalid Body" })
  next()
}
const login = (req, res, next) => {
  const { body } = req
  console.log(body);
  const registerBody = ['email', 'password']
  const bodyProperty = Object.keys(body)
  const isBodyValid =
    registerBody.filter((property) => !bodyProperty.includes(property))
      .length == 0 ? true : false
  if (!isBodyValid) return response(res, { status: 400, message: "Invalid Body" })
  next()
}

module.exports = { register, login };