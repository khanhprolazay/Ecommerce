const userController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

// /users
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/signup', userController.createUser);
router.post('/refreshToken', userController.refreshToken);

module.exports = router;