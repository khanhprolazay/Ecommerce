const couchDB = require('../resource/dbConfig');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const checkFieldObject = require('../utils/CheckFieldObject');
const CartModel = require('../models/CartModel');
const UserModel = require('../models/UserModel');

class CartController {
	#dbName

	constructor() {
		this.#dbName = 'user';
	}

	//[GET] /carts/:username
	getItemOfUser = (req, res, next) => {
		if (!checkFieldObject(req.params, 'username')) {
			res.sendStatus(400);
			return;
		}
		const username = req.params.username;

		CartModel.getItemsByUsername(username)
			.then((items) => res.send(items))
			.catch((err) => res.send(err));
	}

	//[POST]/carts/put
	insertItemToCart = async (req, res, next) => {
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
		const isItemAlreadyInCart = await CartModel.isItemAlreadyInCart(username, itemId);

		if (isItemAlreadyInCart) {
			res.status(204).send('Sản phẩm đã có sẵn trong giỏ hàng!');
			return;
		}

		CartModel.insertItemToCart(username, {
			itemId: itemId,
			quantity: quantity,
			size: size,
			color: color,
			status: 'in_cart', 
			shipFee: 12000,
		})	.then(() => res.status(200).send('Sản phẩm đã được thêm vào giỏ hàng thành công!'))
			.catch((err) => res.send(err));

	}

	//[POST] /carts/order
	order = (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'cart') ||
			!checkFieldObject(req.body, 'username')
		) {
			res.sendStatus(400);
			return;
		}

		// Update items. If status field of that item has value "in_cart"
		// => change it to "on_shipping"
		const username = req.body.username;
		const cart = req.body.cart;

		CartModel.order(username, cart)
			.then((data) => res.status(200).send(data))
			.catch((err) => res.send(err))
	}
}



module.exports = new CartController();
