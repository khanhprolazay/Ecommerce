const couchDB = require('../resource/dbConfig');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const checkFieldObject = require('../utils/CheckFieldObject');

class CartController {
	#dbName
	constructor() {
		this.#dbName = 'user';
	}

	//[GET] /carts/:username
	getItemOfUser = (req, res, next) => {
		const username = req.params.username;
		const mangoQuery = {
			selector: {username: username},
			fields: ['items'],
		};

		couchDB
			.mango(this.#dbName, mangoQuery)
			.then((data) => { return data.data.docs[0].items })
			.then((items) => {
				// Items is the array of all user item. Each item has the following field:
				// [orderId, itemId, quantity, size, color, status, shipFee]
				// Status value is one of these: in_cart, on_shipping, shipped, cancelled

				// In each item, we will get its information base on its id, item information includes
				// [productName, image, category, price, discount, rating, stockQuantity ...]
				// Then, we assign item information to item.

				const addInforToItem = async (items) => {
					for (var i in items) {
						var itemId = items[0].itemId;

						//Get the information of the item in cart base on its id
						var itemInfor = await axios
							.get(`http://localhost:5000/items/${itemId}/get`)
							.then((dataItem) => {return dataItem.data;})
							.catch((err) => next(err));

						//Assign some fields to the information that get from API
						// Note that, items[0] is the item information of user
						itemInfor.orderId = items[0].orderId;
						itemInfor.itemId = items[0].itemId;
						itemInfor.quantity = items[0].quantity;
						itemInfor.size = items[0].size;
						itemInfor.color = items[0].color;
						itemInfor.status = items[0].status;
						itemInfor.shipFee = items[0].shipFee;

						//remove first element in items. Then push itemFor into items
						items.shift();
						items.push(itemInfor);
					}
					res.send(items);
				};
				addInforToItem(items);
			})
			.catch((err) => {
				next(err);
			});
	}

	//[POST]/carts/put
	updateCart = (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'username') ||
			!checkFieldObject(req.body, 'itemId') ||
			!checkFieldObject(req.body, 'quantity') ||
			!checkFieldObject(req.body, 'size') ||
			!checkFieldObject(req.body, 'color')
		) {
			res.status(400).send();
			return;
		}

		const username = req.body.username;
		const itemId = req.body.itemId;
		const quantity = req.body.quantity;
		const size = req.body.size;
		const color = req.body.color;

		const mangoQuery = {selector: {username: username}};

		couchDB
			.mango(this.#dbName, mangoQuery)
			.then((data) => {
				const user = data.data.docs[0];
				const found = user.items.some((item) => item._id === itemId && item.status === 'in_cart');

				// If item already in cart, do not add 
				if (found) {
					res.sendStatus(204);
					return;
				}

				// Add item to user cart
				user.items.push({
					orderId: uuidv4(),
					itemId: itemId,
					quantity: quantity,
					size: size,
					color: color,
					status: 'in_cart',
					shipFee: 12000,
				})

				// Update cart to item
				couchDB
					.update(this.#dbName, {...user})
					.then(() => res.sendStatus(200))
			})
			.catch((err) => res.status(400).send(err));
	}

	//[POST] /carts/order
	order = (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'items') ||
			!checkFieldObject(req.body, 'username')
		) {
			res.status(400).send();
			return;
		}

		// Update items. If status field of that item has value "in_cart"
		// => change it to "on_shipping"
		const username = req.body.username;
		const items = req.body.items;
		const itemsToDB = [];
		const itemsToClient = [];

		for (var i = 0; i < items.length; i++) {
			if (items[i].quantity === 0) 
				continue;

			// If the value of item is 'in_cart' => change it to 'on_shipping'
			// and change the quantity in stock of that item
			if (items[i].status === 'in_cart') {
				items[i].status = 'on_shipping';
				axios.post(`http://localhost:5000/items/${items[i].itemId}/updateQuantity`, {quantity: items[i].quantity})
			}

			itemsToDB.push({
				orderId: items[i].orderId,
				itemId: items[i].itemId,
				quantity: items[i].quantity,
				size: items[i].size,
				color: items[i].color,
				status: items[i].status,
				shipFee: items[i].shipFee,
			});
			itemsToClient.push(items[i]);
		}

		//Send updated cart to client
		res.status(200).send(itemsToClient);

		//Updated cart into database
		const mango = {selector: {username: username}};

		couchDB.mango(this.#dbName, mango).then((data) => {
			// Get id and rev of document
			const user = data.data.docs[0];

			//Update to database
			couchDB.update(this.#dbName, {...user, items: itemsToDB});
		});

	}
}

module.exports = new CartController();
