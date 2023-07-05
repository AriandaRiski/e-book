const Joi = require('joi');

const addValidation = async(req, res, next) => {
    const schema = Joi.object({
        kategori: Joi.string().min(3).max(50).required()
    });

    try {

        const { error } = await schema.validate({ kategori: req.body.kategori });

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();
        
    } catch (error) {
        console.log(error)
    }
}

const editValidation = async(req, res, next) => {

    const schema = Joi.object({
        id_kategori: Joi.number().required(),
        kategori: Joi.string().min(3).max(50).required()
    });

    try {
        
        const { error } = await schema.validate({
            id_kategori: req.params.id_kategori,
            kategori: req.body.kategori
        });

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

const deleteValidation = async(req, res, next) => {

    const schema = Joi.object({
        id_kategori: Joi.number().required()
    })

    try {

        const { error } = await schema.validate({ id_kategori: req.params.id_kategori })

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addValidation,
    editValidation,
    deleteValidation
}