 const express = require('express');
 const router = express.Router();
 const AuthController = require('../controllers/AuthController');
 const validate = require('../utils/validators');
 
 router.post('/register', validate('register'), AuthController.register);
 router.post('/login', validate('login'), AuthController.login);
 
 module.exports = router;
