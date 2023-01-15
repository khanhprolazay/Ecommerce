const express = require('express');
const router = express.Router();

const authen = require('../authen')
const itemsController = require('../controllers/ItemsController');

// /items
router.put('/', itemsController.addItem)
router.get('/:id/get', itemsController.getItemById)
router.get('/:sortBy/:limit/:skip', itemsController.getItems);
router.get('/getNumberOfAllItems', itemsController.getNumberOfAllItems);


module.exports = router;