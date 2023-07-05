const Joi = require('joi');

const LoginValidation = async(req, res, next) => {
    
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()
    })

    const username = req.body.username;
    const pass = req.body.pass;

    try {
        const { error } = schema.validate({username : username, password : pass});

        if(error){
            return res.status(401).json({
                success : false,
                message : error.details[0].message
            })
        }

        next();
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    LoginValidation
}