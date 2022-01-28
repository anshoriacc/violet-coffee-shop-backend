const db = require('../config/db')
// const bcrypt = require('bcrypt')

const deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM users WHERE id = ${id}`;
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err })
            result = {
                msg: 'You have successfully deleted your account'
            }
            resolve({ status: 200, result })
        })
    })
}

module.exports = { deleteAccount }