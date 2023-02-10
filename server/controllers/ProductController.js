const axios = require('axios');
const url = require('url');
const checkFieldObject = require('../utils/CheckFieldObject');
const ProductModel = require('../models/ProductModel');

class ProductController {
	//[GET] /product/get
	// Get item with limit and skip in stock. Then sort its
	getProducts(req, res, next) {
		const url_params = url.parse(req.url, true);
		const query = url_params.query;

		try {
			const _sortBy = query._sortBy;
			const _limit =	parseInt(query._limit);
			const _skip = parseInt(query._skip);

			ProductModel.getProducts(_sortBy, _limit, _skip)
				.then((items) => res.status(200).send(items.data.rows))
				.catch((err) => res.status(400).send(err));
		} catch (err) {
			res.status(400).send(err);
		}
	}

	//[GET] /product/:id/get
	// Get item information base on its id
	getProductById(req, res, next) {
		const itemId = req.params.id;
		ProductModel.findProductById(itemId)
			.then((item) => res.status(200).send(item))
			.catch((err) => res.send(err));
	}

	//[GET]/product/getNumberOfAllItems
	getNumberOfAllProduct(req, res, next) {
		axios
			.get('http://root:root@127.0.0.1:5984/clothes-shop')
			.then((data) => res.send({ number: data.data.doc_count }));
	}

	//[PUT] /product
	// Add item to database
	addProduct(req, res, next) {
		if (!checkFieldObject(req.body, 'item')) {
			res.status(400).send('');
			return;
		}
		const item = JSON.parse(req.body.item);
		ProductModel.insertProduct(item)
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	}

	//[POST] /product/:id/updateQuantityWhenOrder
	updateQuantityWhenOrder(req, res, next) {
		if (!checkFieldObject(req.body, 'quantity')) {
			return;
		}

		const id = req.params.id;
		const quantity = req.body.quantity;

		ProductModel.getStockQuantityById(id).then((stockQuantity) => {
			if (quantity > stockQuantity) {
				res.status(400).send('Số lượng sản phẩm vượt quá số lượng trong kho!');
				return;
			}

			ProductModel.updateQuantity(id, quantity)
				.then(() => res.sendStatus(200))
				.catch((err) => res.send(err));
		});
	}
}

module.exports = new ProductController();
