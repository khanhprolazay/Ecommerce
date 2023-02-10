const shopController = require('../controllers/ShopController');
const express = require('express');
const router = express.Router();

//shop
router.get('/location', shopController.getLocation);

module.exports = router;