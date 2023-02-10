const checkFieldObject = require('../utils/CheckFieldObject');
const CartModel = require('../models/CartModel');

class CartController {
	#dbName;

	constructor() {
		this.#dbName = 'user';
	}

	//[GET] /carts/:username
	getProductOfUser = (req, res, next) => {
		if (!checkFieldObject(req.params, 'username')) {
			res.sendStatus(400);
			return;
		}
		const username = req.params.username;

		CartModel.getProductsByUsername(username)
			.then((items) => res.send(items))
			.catch((err) => res.send(err));
	};

	//[POST]/carts/put
	insertProduct = async (req, res, next) => {
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
		const isItemAlreadyInCart = await CartModel.isAlreadyHaveProduct(
			username,
			itemId
		);

		if (isItemAlreadyInCart) {
			res.status(204).send('Sản phẩm đã có sẵn trong giỏ hàng!');
			return;
		}

		CartModel.insertProduct(username, {
			itemId: itemId,
			quantity: quantity,
			size: size,
			color: color,
			status: 'in_cart',
			shipFee: 12000,
		})
			.then(() =>
				res.status(200).send('Sản phẩm đã được thêm vào giỏ hàng thành công!')
			)
			.catch((err) => res.send(err));
	};

	//[POST]/carts/delete
	deleteProduct = async (req, res, next) => {
		if (
			!checkFieldObject(req.body, 'itemId') ||
			!checkFieldObject(req.body, 'username')
		) {
			res.sendStatus(400);
			return;
		}

		const username = req.body.username;
		const itemId = req.body.itemId;
		
		CartModel.deleteProduct(username, itemId)
			.then(() => res.sendStatus(200))
			.catch((err) => res.send(err));
	};

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
			.catch((err) => res.send(err));
	};
}

module.exports = new CartController();
