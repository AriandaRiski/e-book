const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const db = require("./dbConfig")
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "riski**";

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(201).json({ say: 'hello world' });
});

app.post('/post/:idpost', (req, res) => {

    if (!req.body.umur) {
        return res.status(201).json({ pesan: "tidak ada umur" })
    }

    if (req.body.umur > 30) {
        return res.status(201).json({ pesan: "tidak bisa ikut bumn" })

    }

    res.status(201).json({
        nama: req.body.nama,
        jk: req.body.jk,
        id: req.params.idpost,
        judul: req.query.judul
    })
})

app.post('/umur', (req, res) => {
    try {

        let umur = req.body.umur;

        if (umur == '') {
            return res.status(201).json({
                pesan: "umur gaboleh kosong"
            })
        }

        if (umur >= 30) {
            return res.status(201).json({
                pesan: "gabisa ikut bumn"
            })
        }

        return res.status(201).json({
            umur: umur
        })

    } catch (error) {
        console.log(error)
    }

})


/**
 * Middleware
 */
 const cekLogin = async(req, res, next) => {
    try {
        const authHeader = req.header('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null){
            res.status(401).json({message : 'Login dulu, token invalid'});
            return false;
        }

        const decode = jwt.verify(token, secretKey);
        req.auth = decode;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
}

/**
 * Endpoint list kategori
 */
app.get('/kategori/list', cekLogin, async (req, res) => {
    try {

        const kategori = await db.select('*').from('kategori');

        return res.status(201).json({
            success: true,
            data: kategori,
            keterangan: "List kategori"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
})

app.post('/kategori/tambah', cekLogin, async (req, res) => {

    const schema = Joi.object({
        kategori: Joi.string().min(3).max(50).required()
    });

    let kategori = req.body.kategori;
    
    try {


        const { error } = await schema.validate({ kategori: kategori });

        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }

        const cek = await db.select('*').from('kategori').where({ kategori: kategori }).first();
        if (cek) {
            return res.json({
                status: false,
                message: `Data Kategori " ${kategori} " Sudah Tersedia`
            });
        }

        const insert = await db('kategori').insert({
            kategori: kategori
        })

        res.status(201).json({
            status: true,
            message: `Berhasil Insert Kategori, ${kategori}`
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
})

app.put('/kategori/edit/:id_kategori', cekLogin, async (req, res) => {

    const schema = Joi.object({
        id_kategori: Joi.number().required(),
        kategori: Joi.string().min(3).max(50).required()
    });

    let id_kategori = req.params.id_kategori;
    let kategori = req.body.kategori;

    try {

        const { error } = await schema.validate({
            id_kategori: id_kategori,
            kategori: kategori
        });

        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }

        const cek = await db.select('id_kategori').from('kategori').where('id_kategori', id_kategori).first();

        if (!cek) {
            return res.json({ message: `data dengan id = ${id_kategori} tidak ditemukan!` })
        }

        await db('kategori').where({
            id_kategori: id_kategori
        }).update({ kategori })

        return res.status(201).json({
            success: true,
            message: "Kategori Berhasil di Update!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
})

app.delete('/kategori/hapus/:id_kategori', cekLogin, async (req, res) => {

    const schema = Joi.object({
        id_kategori: Joi.number().required()
    })

    const id_kategori = req.params.id_kategori;

    try {

        const { error } = await schema.validate({ id_kategori: id_kategori })

        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }

        const cek = await db.select('id_kategori').from('kategori').where('id_kategori', id_kategori).first();
        if (!cek) {
            return res.json({ message: `data dengan id = ${id_kategori} tidak ditemukan!` });
        }

        await db('kategori').where({ id_kategori: id_kategori }).del();

        return res.status(201).json({
            success: true,
            message: "Kategori berhasil dihapus!"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
})

/**
 * end kategori
 */


/**
 *  Login
 */

app.post('/login', async (req, res) => {

    // untuk registrasi
    // const password = await bcrypt.hashSync( username , 10);

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

        const getUser = await db.select('*').from('user').where({ username: username }).first();
        if (!getUser) {
            return res.status(401).json({ 
                success : false, 
                message : `username atau password salah!` });
        }

        const cek_pass = await bcrypt.compare(pass, getUser.password);
        if (!cek_pass) {
            return res.status(401).json({ 
                success : false, 
                message : `username atau password salah!` });
        }

        const payload = {
            id: getUser.id,
            username: getUser.username
        }

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            data: getUser,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
})

/**
 * end Login
 */

app.listen(port, () => {
    console.log(`aplikasi ini berjalan di host http://localhost:${port}`);
});