const Joi = require('joi');

const addValidation = async (req, res, next) => {
    const schema = Joi.object({
        id_kategori: Joi.number().integer().min(1).required(),
        judul: Joi.string().min(3).required(),
        pengarang: Joi.string().min(3).required(),
        tahun: Joi.number().integer().min(1900),
        penerbit: Joi.string().min(3).required(),
        kota: Joi.string().min(3).required()
    });

    try {

        const data = {
            judul: req.body.judul,
            id_kategori: req.body.id_kategori,
            pengarang: req.body.pengarang,
            tahun: req.body.tahun,
            penerbit: req.body.penerbit,
            kota: req.body.kota
        }

        const { error } = await schema.validate(data);

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

const editValidation = async (req, res, next) => {

    const schema = Joi.object({
        id_kategori: Joi.number().integer().min(1).required(),
        judul: Joi.string().min(3).required(),
        pengarang: Joi.string().min(3).required(),
        tahun: Joi.number().integer().min(1900),
        penerbit: Joi.string().min(3).required(),
        kota: Joi.string().min(3).required(),
        id: Joi.number().integer().required()
    });

    try {

        const { error } = await schema.validate({
            judul: req.body.judul,
            id_kategori: req.body.id_kategori,
            pengarang: req.body.pengarang,
            tahun: req.body.tahun,
            penerbit: req.body.penerbit,
            kota: req.body.kota,
            id: req.params.id
        });

        if (error) {
            return res.json({ message: error.details[0].message })
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

const deleteValidation = async (req, res, next) => {

    const schema = Joi.object({
        id: Joi.number().integer().required()
    })

    try {

        const { error } = await schema.validate({ id: req.params.id })

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
    deleteValidation,
    editValidation
}