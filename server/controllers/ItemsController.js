const axios = require('axios');
const checkFieldObject = require('../utils/CheckFieldObject');
const ItemModel = require('../models/ItemModel');

class ItemsController {
	//[GET] /items/:sortBy/:limit/:skip
	// Get item with limit and skip in stock. Then sort its
	getItems(req, res, next) {
		if (
			!checkFieldObject(req.params, 'sortBy') ||
			!checkFieldObject(req.params, 'limit') ||
			!checkFieldObject(req.params, 'skip')
		)
			return;

		const sortBy = req.params.sortBy;
		const limit = req.params.limit;
		const skip = req.params.skip;
		ItemModel
			.getItems(sortBy, limit, skip)
			.then((items) => res.status(200).send(items.data.rows))
			.catch((err) => res.status(400).send(err));
	}

	//[GET] /items/:id/get
	// Get item information base on its id
	getItemById(req, res, next) {
		const itemId = req.params.id;
		ItemModel.findItemById(itemId)
			.then((item) => res.status(200).send(item))
			.catch((err) => res.send(err));
		
	}

	//[GET]/items/getNumberOfAllItems
	getNumberOfAllItems(req, res, next) {
		axios
			.get('http://root:root@127.0.0.1:5984/clothes-shop')
			.then((data) => res.send({ number: data.data.doc_count }));
	}

	//[PUT] /items
	// Add item to database
	addItem(req, res, next) {
		if (!checkFieldObject(req.body, 'item')) {
			res.status(400).send('');
			return;
		}
		const item = JSON.parse(req.body.item);
		ItemModel.insertItem(item)
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	}

	//[POST] /items/:id/updateQuantityWhenOrder
	updateQuantityWhenOrder(req, res, next) {
		if (!checkFieldObject(req.body, 'quantity')) {
			return;
		}

		const id = req.params.id;
		const quantity = req.body.quantity;

		ItemModel.getStockQuantityById(id)
			.then((stockQuantity) => {
				if (quantity > stockQuantity) {
					res.status(400).send('Số lượng sản phẩm vượt quá số lượng trong kho!');
					return;
				}

				ItemModel.updateQuantity(id, quantity)
					.then(() => res.sendStatus(200))
					.catch((err) => res.send(err));

			})
	}

}

module.exports = new ItemsController();
