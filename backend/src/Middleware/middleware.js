const jwt = require('jsonwebtoken');
const secretKey = "riski**";

const cekLogin = async(req, res, next) => {

    try {

        const authHeader = req.header('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null){
            res.status(401).json({message : 'Login dulu, token invalid'});
            return false;
        }

        const decode = await jwt.verify(token, secretKey);
        req.auth = decode;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
}

module.exports = {
    cekLogin
}