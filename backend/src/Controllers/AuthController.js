
const AuthModel = require('../Models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const Login = async (req, res) => {

    const username = req.body.username;
    const pass = req.body.pass;

    try {
        const getUser = await AuthModel.getUser(username);
        if (!getUser) {
            return res.status(401).json({
                success: false,
                message: `username atau password salah!`
            });
        }

        const cek_pass = await bcrypt.compare(pass, getUser.password);
        if (!cek_pass) {
            return res.status(401).json({
                success: false,
                message: `username atau password salah!`
            });
        }

        const payload = {
            id: getUser.id,
            username: getUser.username
        }

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        const result =  res.status(200).json({
            success: true,
            data: getUser,
            token: token
        })

        return result;


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

module.exports = {
    Login
}