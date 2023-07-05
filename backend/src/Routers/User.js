const Router = require('express').Router();
const UserValidation = require('./../Controllers/Validations/UserController.Validation')
const UserController = require('../Controllers/UserController');

Router.get('/list', UserController.ListUser);
Router.get('/userById/:id', UserValidation.UserById, UserController.UserById);

module.exports = Router;

