const db = require('./../config/db')

const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // const sqlQuery = `INSERT INTO users (username, email,password,phone,address,birthday,displayname,image) VALUES ("${username}","${email}","${password}","${phone}", "${adress}","${birthday}","${displayname}","${image}")`;
        db.query('INSERT INTO users (display_name, email,password) VALUES (?,?,?)',[username, email, password],(error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    });
}

const cekEmail = (email) => {
    return new Promise((resolve, reject) => {
        // const sqlQuery = `SELECT * FROM users  WHERE email = '${email}' LIMIT 1`;
        db.query('SELECT * FROM users  WHERE email = ? LIMIT 1',[email], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }

        });
    })
}

module.exports = { createUser,cekEmail}