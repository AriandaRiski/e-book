const Router = require('express').Router();
const AuthController = require('./../Controllers/AuthController');
const AuthValidation = require('../Controllers/Validations/AuthController.Validation');

Router.post('/login', AuthValidation.LoginValidation, AuthController.Login)

module.exports = Router;