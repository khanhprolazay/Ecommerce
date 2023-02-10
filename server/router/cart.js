const express = require('express');
const router = express.Router();

const authen = require('../authen');
const cartController = require('../controllers/CartController');

// /carts
router.get('/:username', authen.authenToken, cartController.getProductOfUser);
router.post('/order', authen.authenToken, cartController.order);
router.post('/put', authen.authenToken, cartController.insertProduct);
router.post('/delete', authen.authenToken, cartController.deleteProduct)

module.exports = router;