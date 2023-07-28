const Routers = require('express').Router();
const middleware = require('../Middleware/middleware');
const Auth = require('./Auth');
const Kategori = require('./Kategori');
const User = require('./User');
const Buku = require('./Buku');

Routers.use('/auth', Auth);
Routers.use('/kategori', middleware.cekLogin , Kategori );
Routers.use('/user', User);
Routers.use('/buku', Buku);

module.exports = Routers;
