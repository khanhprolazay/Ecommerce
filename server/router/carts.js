const express = require('express');
const router = express.Router();

const authen = require('../authen');
const cartController = require('../controllers/CartController');

// /carts
router.get('/:username', authen.authenToken, cartController.getItemOfUser);
router.post('/order', authen.authenToken, cartController.order);
router.post('/put', authen.authenToken, cartController.updateCart);

module.exports = router;