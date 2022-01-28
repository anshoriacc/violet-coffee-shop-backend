const db = require('./../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                    db.query(sqlQuery, [bodyWithHashedPass], (err, result) => {
                        if (err) reject({ status: 500, err })
                        // if (typeof phone !== 'number') reject({ status: 401, error: 'Harus Number' })

                        resolve({ status: 201, result })
                    })
                })
                .catch((err) => { reject({ status: 500, err }) })
        })
    })
}

const signIn = (body) => {
    return new Promise((resolve, reject) => {
        const { email, password } = body
        const sqlQuery = `SELECT * FROM users WHERE ?`

        db.query(sqlQuery, { email }, (err, result) => {
            if (err) return reject(({ status: 500, err }))
            if (!email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@mail.com')) return reject({ status: 401, err: "Invalid Email" })
            if (result.length == 0) return reject({ status: 401, err: "Email/Password Salah" })

            bcrypt.compare(password, result[0].password, (err, isValid) => {
                if (err) return reject({ status: 500, err })

                if (!isValid) return reject({ status: 401, err: 'Email/Password Salah' })
                const payload = {
                    // id: result[0].id,
                    email: result[0].email,
                    display_name: result[0].display_name,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    dob: result[0].dob,
                    delivery_adress: result[0].delivery_adress,
                    image: result[0].image,
                    phone: result[0].phone
                }
                const jwtOptions = {
                    expiresIn: "10h",
                }
                jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
                    if (err) reject({ status: 500, err })

                    const { name, email, display_name,
                        first_name, last_name, dob,
                        delivery_adress, image, phone, } = result[0]

                    resolve({
                        status: 200, result: {
                            name, email, display_name,
                            first_name, last_name, delivery_adress,
                            dob, image, phone, token
                        }
                    })
                })
            })
        })
    })
}

module.exports = {
    createUser,
    signIn,
}