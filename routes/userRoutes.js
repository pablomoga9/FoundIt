 const routes = require('express').Router();
 const userController = require('../controllers/userControllers');


 routes.post('/signup',userController.signup);
 routes.post('/login',userController.login);


module.exports = routes;