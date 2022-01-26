const db = require('./../config/db')

const createProduct = (name, description, price, size, deliveryMethods, stock, startDelivery, endDelivery, category,image) => {
    return new Promise((resolve, reject) => {
        // const sqlQuery = `INSERT INTO users (username, email,password,phone,address,birthday,displayname,image) VALUES ("${username}","${email}","${password}","${phone}", "${adress}","${birthday}","${displayname}","${image}")`;
        db.query('INSERT INTO products (name, description, price, size, delivery_methods, stock, start_delivery, end_delivery, category, image) '
        +'VALUES (?,?,?,?,?,?,?,?,?,?)',[name, description, price, size, deliveryMethods, stock, startDelivery, endDelivery, category,image],(error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    });
}

module.exports = { createProduct}