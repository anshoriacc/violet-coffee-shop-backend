const db = require('./../config/db')
const bcrypt = require('bcrypt')

const detailPersonal = (userInfo) => {
    return new Promise((resolve, reject) => {
        const { id } = userInfo
        const sqlQuery = `SELECT * FROM users WHERE id = ${id}`

        db.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err })
            resolve({ status: 200, result })
        })
    })
}

const editUser = (userInfo, body, file) => {
    return new Promise((resolve, reject) => {
        const { email } = body
        const { id } = userInfo
        const checkEmail = `SELECT * FROM users WHERE email = ?`

        db.query(checkEmail, [email], (err, result) => {
            if (err) return reject({ status: 500, err })
            if (result.length > 0) return reject({ status: 401, err: "Email is Already" })
            if (!email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@mail.com')) return reject({ status: 401, err: "Invalid Email" })

            const sqlQuery = `UPDATE users SET ? WHERE id = ${id}`
            if (file) body = { ...body, image: file.filename }
            if (!file) body = { ...body }

            db.query(sqlQuery, [body], (err, result) => {
                if (err) return reject({ status: 500, err })
                result = { msg: 'Success Change Profile' }
                resolve({ status: 200, result })
            })
        })
    })
}

const editPassword = (userInfo, body) => {
    return new Promise((resolve, reject) => {
        const { currentPass, newPass } = body
        const checkPass = `SELECT password from users WHERE id = ${userInfo.id}`
        db.query(checkPass, (err, result) => {
            if (err) return reject({ status: 500, err })
            bcrypt.compare(currentPass, result[0].password, (err, isValid) => {
                if (err) return reject({ status: 500, err })
                if (isValid !== true) return reject({ status: 401, err: 'Curent Password is wrong' })
                bcrypt
                    .hash(newPass, 10)
                    .then((hashedPassword) => {
                        const sqlQuery = `UPDATE users SET password = ? WHERE id = ${userInfo.id}`
                        db.query(sqlQuery, [hashedPassword], (err, result) => {
                            if (err) return reject({ status: 500, err })
                            if (currentPass === newPass) return reject({ status: 401, err: 'Password is Used' })
                            result = { msg: 'Change Password is Success' }
                            resolve({ status: 200, result })
                        })
                    })
                    .catch((err) => {
                        reject({ status: 500, err })
                    })
            })
        })
    })
}

const removePhoto = (userInfo) => {
    return new Promise((resolve, reject) => {
        const { id } = userInfo
        const empty = null
        const sqlQuery = `UPDATE users SET image = ${empty} WHERE id = ${id}`
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err })
            result = { msg: 'Remove Photo Profile Success' }
            resolve({ status: 200, result })
        })
    })
}

const deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM users WHERE id = ${id}`;
        db.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err })
            result = { msg: 'You have successfully deleted your account' }
            resolve({ status: 200, result })
        })
    })
}

module.exports = {
    detailPersonal,
    editUser,
    editPassword,
    removePhoto,
    deleteAccount
}