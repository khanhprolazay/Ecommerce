const couchDB = require('../resource/dbConfig');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {
	isEmptyObject,
	sortByDateValue,
	sortByNumberValue,
} = require('../utils');
const checkFieldObject = require('../utils/CheckFieldObject');

class ItemsController {
	//[GET] /items/:sortBy/:limit/:skip
	// Get item with limit and skip in stock. Then sort its
	getItems(req, res, next) {
		if (!checkFieldObject(req.params, 'sortBy') ||
			!checkFieldObject(req.params, 'limit') ||
			!checkFieldObject(req.params, 'skip')
		) return;

		const sortBy = req.params.sortBy;
		const limit = req.params.limit;
		const skip = req.params.skip;
		let sortField = '';

		switch (sortBy) {
			case 'hot':
				sortField = 'sellQuantity';
				break;
			case 'new':
				sortField = 'updatedAt';
				break;
			case 'sale':
				sortField = 'discount';
				break;
			default :
				return;
		}

		const queryOptions = {
			descending: true,
			include_docs: true,
			limit: limit,
			skip: skip
		};
		const viewUrl = `_design/sort/_view/sort-by-${sortField}`;
		const dbName = 'clothes-shop';
		couchDB
			.get(dbName, viewUrl, queryOptions)
			.then((items) => res.status(200).send(items.data.rows))
			.catch((err) => res.status(400).send(err));
	}

	//[GET] /items/:id/get
	// Get item information base on its id
	getItemById(req, res, next) {
		const itemId = req.params.id;
		const dbName = 'clothes-shop';
		const mangoQuery = {
			selector: {
				_id: itemId,
			},
			fields: [
				'_id',
				'productName',
				'category',
				'image',
				'price',
				'discount',
				'rating',
				'stockQuantity',
			],
		};
		couchDB
			.mango(dbName, mangoQuery)
			.then((data, headers, status) => {
				res.send(data.data.docs[0]);
			})
			.catch((err) => {
				next(err);
			});
	}

	//[GET]/items/getNumberOfAllItems
	getNumberOfAllItems(req, res, next) {
		axios.get('http://root:root@127.0.0.1:5984/clothes-shop')
			.then((data) => res.send({number: data.data.doc_count}))	
	}

	//[PUT] /items
	// Add item to database
	addItem(req, res, next) {
		if (!checkFieldObject(req.body, 'item')) {
			res.status(400).send('');
			return;
		}

		const item = JSON.parse(req.body.item);

		couchDB
			.insert('clothes-shop', {
				_id: uuidv4(),
				productName: item.productName,
				image: item.image,
				category: item.category,
				price: item.price,
				discount: item.discount,
				rating: item.rating,
				stockQuantity: item.stockQuantity,
				sellQuantity: item.sellQuantity,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
			})
			.then((data) => res.status(200).send(''))
			.catch((err) => {
				res.status(400).send(err);
			});
	}

	//[POST] /items/:id/updateQuantity
	updateQuantity(req, res, next) {
		if (!checkFieldObject(req.body, 'quantity')) {
			return;
		}

		const id = req.params.id;
		const quantity = req.body.quantity;

		// Update item to database
		couchDB
			.get('clothes-shop', id)
			.then((data) => {
				return data.data;
			})
			.then((item) => {
				// If order quantity is greater its quanity in stock
				// => error
				if (quantity > item.stockQuantity) {
					res.status(400).send();
					return;
				}

				couchDB
					.update('clothes-shop', {
						_id: item._id,
						_rev: item._rev,
						productName: item.productName,
						image: item.image,
						category: item.category,
						price: item.price,
						discount: item.discount,
						rating: item.rating,
						stockQuantity: item.stockQuantity - quantity,
						sellQuantity: item.sellQuantity + quantity,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
					})
					.then(() => res.status(200).send());
			})
			.catch((err) => res.status(400).send());
	}
}

module.exports = new ItemsController();
