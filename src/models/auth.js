// const { reject } = require('bcrypt/promises')
const db = require('./../config/db')
const bcrypt = require('bcrypt')

const createUser = (body) => {
    return new Promise((resolve, reject) => {
        const { email, password, phone } = body
        const checkemail = `SELECT * FROM users where email = ?`

        db.query(checkemail, [email], (err, result) => {
            if (err) return reject({ status: 500, err })

            if (email === '' || phone === '' || password === '') return reject({ status: 401, err: "Need Name/email/Password" })
            if (!email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@mail.com')) return reject({ status: 401, err: "Invalid Email" }) //salah satu jika mail tidak sesuai
            if (result.length > 0) return reject({ status: 401, err: "Email is Already" })

            const sqlQuery = `INSERT INTO users SET ?`

            bcrypt
                .hash(password, 10)
                .then((hashedPass) => {
                    const bodyWithHashedPass = {
                        ...body,
                        password: hashedPass
                    }
                    db.query(sqlQuery, [bodyWithHashedPass], (error, result) => {
                        if (error) reject({ status: 500, error })
                        if (typeof phone !== 'number') reject({ status: 401, err: 'Harus Number' })

                        resolve({ status: 201, result })
                    })
                })
                .catch((error) => { reject({ status: 500, error }) })
        })
    })
}

// const cekEmail = (email) => {
//     return new Promise((resolve, reject) => {
//         // const sqlQuery = `SELECT * FROM users  WHERE email = '${email}' LIMIT 1`;
//         db.query('SELECT * FROM users  WHERE email = ? LIMIT 1', [email], (error, result) => {
//             if (!error) {
//                 resolve(result)
//             } else {
//                 reject(error)
//             }

//         });
//     })
// }

module.exports = { createUser }