const model = require("../models/sequelize/index");
const { response } = require("../helper/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, password } = req.body;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email))
        return response(res, {
            status: 400,
            message: "Format Email Invalid",
        });

    try {
        const result = await model.users.findOne({
            where: {
                email,
            },
        });
        console.log(result);
        if (result !== null)
            return response(res, {
                status: 400,
                message: "email sudah terdaftar",
            });
        const body = req.body;
        body.password = await bcrypt.hash(password, 10);
        await model.users.create(body);
        return response(res, {
            // data: data,
            status: 200,
            message: "Register Success",
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

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await model.users.findOne({
            where: {
                email,
            },
        });
        console.log(email, password);
        const isValid = await bcrypt.compare(password, result.password);
        console.log(isValid);
        if (!isValid)
            return response(res, {
                status: 401,
                message: "email atau password salah",
            });
        const payload = {
            id: result.id,
            email: result.email,
            role: result.role,
        };
        const jwtOptions = {
            expiresIn: "10h",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, jwtOptions);
        console.log(token);
        //   return response({user:payload, token},200, "login success")

        return response(res, {
            data: token,
            status: 200,
            massage: "login success",
        });
        // httpResponse(res, await services.createUser(req.body));
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Password atau Email Salah",
            error,
        });
    }
}

const logout = async (req, res) => {
    const token = req.header('x-access-token')
    try {
        const result = await model.white_list_token.create({ token })
        return response(res, {
            data: result,
            status: 200,
            message: "edit password succes",
        });

    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
        });
    }
}

module.exports = { register, login, logout }
