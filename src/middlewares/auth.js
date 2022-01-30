const jwt = require("jsonwebtoken")
const db = require('../config/db');

const checkToken = (req, res, next) => {
  const token = req.header('x-access-token')
  const sqlGetBlackList = `SELECT token FROM blacklist_token WHERE token = ?`
  db.query(sqlGetBlackList, [token], (err, result) => {
    if (err) return res.status(500).json({ err })
<<<<<<< HEAD
    if (result.length > 0) return res.status(500).json({ msg: 'You need to login first' })
=======
    if (result.length > 0) return res.status(500).json({ message: 'You need to login first' })
    
>>>>>>> origin
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return res.status(500).json({ message: 'You need to login first' })
      const { id, name, role } = payload;
      console.log(payload);
      req.userInfo = { id, name, role };
      next();
    });
  });
}

module.exports = { checkToken };