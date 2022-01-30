const jwt = require("jsonwebtoken")
const db = require('../config/db');
const response = require('../helper/response')

const checkToken = (req, res, next) => {
  const token = req.header('x-access-token')
  const sqlGetBlackList = `SELECT token FROM blacklist_token WHERE token = ?`
  db.query(sqlGetBlackList, [token], (err, result) => {
    if (err) return res.status(500).json({ err })
    if (result.length > 0) return res.status(500).json({ msg: 'You need to login first' })
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return response.error(res, 403, { msg: 'You need to login first', })
      req.userInfo = payload
      next();
    });
  });
}

module.exports = { checkToken };