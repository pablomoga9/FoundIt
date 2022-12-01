 const routes = require('express').Router();
 const userController = require('../controllers/userControllers');


 routes.post('/signup',userController.signup);
 routes.post('/login',userController.login);
 routes.get('/getUser',userController.getUser);
 routes.get('/logout',userController.logoutUser);
 routes.get('/getPreferences/:user',userController.getPreferences)

module.exports = routes;