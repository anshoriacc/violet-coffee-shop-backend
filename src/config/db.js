// setup mysql
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect();

module.exports = db;
