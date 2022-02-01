const model = require("../models/sequelize/index");
const { response } = require("../helper/response");
const bcrypt = require("bcrypt");

const detailPersonal = (req, res) => {
    const { id } = req.userInfo
    model.users.findOne(
        {
            where: id,
            attributes: [
                'id', 'email', 'phone',
                'delivery_adress', 'gender',
                'display_name', 'first_name', 'image','role'
            ]
        }
    )
        .then((result) => {
            response(res, {
                status: 200,
                data: result,
                message: "Success Get Profile Detail",
            })
        })
        .catch((err) => {
            response(res, {
                status: 200,
                message: 'Error',
                error: err
            })
        })
}

const editUser = async (req, res) => {
    const { id } = req.userInfo;
    const image = req.file?.filename
        ? `${process.env.IMAGE_HOST}${req.file.filename}`
        : null;
    const body = req.body;
    body.image = image;
    console.log(req.userInfo);

    if (body.email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(body.email))
            return response(res, {
                status: 400,
                message: "Format Email Invalid",
            });
    }

    model.users.update(
        body,
        {
            where: { id }
        }
    )
        .then((result) => {
            response(res, {
                status: 200,
                data: result,
                message: "Success Edit user",
            })
        })
        .catch((err) => {
            res.status(500).json(err)
        })
};


const editPassword = async (req, res) => {
    const { id } = req.userInfo;
    const body = req.body;

    try {
        const result = await model.users.findOne({
            where: { id },
        });
        const isValid = await bcrypt.compare(body.currentPass, result.password);
        console.log(isValid);
        if (!isValid)
            return response(res, {
                status: 401,
                message: "password wrong",
            });
        const password = await bcrypt.hash(body.newPass, 10);
        const data = await model.users.update({ password }, {
            where: { id },
        });
        console.log(data);
        return response(res, {
            status: 200,
            message: "edit password succes",
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}


module.exports = {
    detailPersonal,
    editUser,
    editPassword
}