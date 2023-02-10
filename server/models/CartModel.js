const { v4: uuidv4 } = require('uuid');
const UserModel = require('./UserModel');
const ProductModel = require('./ProductModel');

class CartModel {
	#dbName;
	#userDB;
	#itemDB;
	constructor() {
		this.#dbName = 'user';
		this.#userDB = 'user';
		this.#itemDB = 'clothes-shop';
	}

	async getProductsByUsername(username) {
		let itemsOfUser = await UserModel.getFieldsByUsername(username, ['items']);
		if (itemsOfUser) {
			for (var i in itemsOfUser) {
				const itemInfor = await ProductModel.findProductById(itemsOfUser[i].itemId);
				itemsOfUser[i] = { ...itemsOfUser[i], ...itemInfor };
			}
		}
		return itemsOfUser;
	}

	async isAlreadyHaveProduct(username, itemId) {
		const itemsOfUser = await UserModel.getFieldsByUsername(username, [
			'items',
		]);
		return itemsOfUser.some(
			(item) => item._id === itemId && item.status === 'in_cart'
		);
	}

	async insertProduct(username, item) {
		let itemsOfUser = await UserModel.getFieldsByUsername(username, ['items']);

		// If Cart is already have item, get orderId of that item
		let index = itemsOfUser.findIndex((item) => item.status === 'in_cart');
		let orderId = index === -1 ? uuidv4() : itemsOfUser[index].orderId;

		itemsOfUser.push({ ...item, orderId: orderId });
		await UserModel.updateUser(username, { items: itemsOfUser });
	}

	async deleteProduct(username, itemId) {
		let itemsInCart = await UserModel.getFieldsByUsername(username, ['items']);
		itemsInCart = itemsInCart.filter((item) => item.itemId !== itemId);
		await UserModel.updateUser(username, { items: itemsInCart });
	}

	// Update user item when order
	async order(username, cart) {
		let items = await UserModel.getFieldsByUsername(username, ['items']);

		//Check if order quantity is greater than quantity in stock
		for (var i in cart) {
			let stockQuantity = await ProductModel.getStockQuantityById(cart[i].itemId);
			if (cart[i].quantity > stockQuantity) {
				throw new Error(
					`Sản phẩm ${cart[i].productName} đang vượt quá số lượng trong kho`
				);
			}
		}

		for (var i in cart) {
			const index = items.findIndex(
				(item) => item.status === 'in_cart' && item.itemId === cart[i].itemId
			);

			// If there is an item having the quantity equal 0, skip it
			if (cart[i].quantity === 0) {
				items.splice(index, 1);
				continue;
			}

			items[index].quantity = cart[i].quantity;
			items[index].status = 'on_shipping';
			await ProductModel.updateQuantityWhenOrder(cart[i].itemId, cart[i].quantity);
		}
		await UserModel.updateUser(username, { items: items });
	}
}

module.exports = new CartModel();
