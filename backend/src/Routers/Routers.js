const Routers = require('express').Router();
const middleware = require('../Middleware/middleware');
const Auth = require('./Auth');
const Kategori = require('./Kategori');
const User = require('./User');

Routers.use('/auth', Auth);
Routers.use('/kategori', middleware.cekLogin , Kategori );
Routers.use('/user', User);

module.exports = Routers;
