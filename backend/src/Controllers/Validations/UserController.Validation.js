const Joi = require('joi');

const UserById = async(req, res, next) => {
    
    const schema = Joi.object({
        id: Joi.number().required(),
    });

    try {

        const { error } = await schema.validate({ id: req.params.id });

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    UserById
}