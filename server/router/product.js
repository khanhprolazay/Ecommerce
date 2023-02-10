const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// /product
router.put('/', productController.addProduct);
router.get('/:id/get', productController.getProductById);
router.get('/get', productController.getProducts);
router.get('/getTotalProducts', productController.getNumberOfAllProduct);

module.exports = router;