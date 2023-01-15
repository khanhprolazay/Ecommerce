const { v4: uuidv4 } = require('uuid');
const UserModel = require('../models/UserModel');
const ItemModel = require('../models/ItemModel');

class CartModel {
	#dbName;
	#userDB;
	#itemDB;
	constructor() {
		this.#dbName = 'user';
		this.#userDB = 'user';
		this.#itemDB = 'clothes-shop';
	}

	async getItemsByUsername(username) {
		let itemsOfUser = await UserModel.getFieldsByUsername(username, ['items']);
		if (itemsOfUser) {
			for (var i in itemsOfUser) {
				const itemInfor = await ItemModel.findItemById(itemsOfUser[i].itemId);
				itemsOfUser[i] = { ...itemsOfUser[i], ...itemInfor };
			}
		}
		return itemsOfUser;
	}

	async isItemAlreadyInCart(username, itemId) {
		const itemsOfUser = await UserModel.getFieldsByUsername(username, ['items']);
		return itemsOfUser.some((item) => item._id === itemId && item.status === 'in_cart');
	}

	async insertItemToCart(username, item) {
		let itemsOfUser = await UserModel.getFieldsByUsername(username, ['items']);
		itemsOfUser.push({ ...item, orderId: uuidv4() });
		await UserModel.updateUser(username, { items: itemsOfUser });
	}

	// Update user item when order
	async order(username, cart) {
		let items = await UserModel.getFieldsByUsername(username, ['items']);

		//Check if order quantity is greater than quantity in stock
		for (var i in cart) {
			let stockQuantity = await ItemModel.getStockQuantityById(cart[i].itemId);
			if (cart[i].quantity > stockQuantity) 
				throw new Error(`Sản phẩm ${cart[i].productName} đang vượt quá số lượng trong kho`);
		}

		for (var i in cart) {
			const index = items.findIndex((item) => item.orderId === cart[i].orderId);

			// If there is an item having the order quantity 0, skip it 
			if (cart[i].quantity === 0) {
				items.splice(index, 1);
				continue;
			}

			items[index].quantity = cart[i].quantity;
			items[index].status = 'on_shipping';
			await ItemModel.updateQuantityWhenOrder(cart[i].itemId, cart[i].quantity);
		}
		await UserModel.updateUser(username, { items: items });
	}
}

module.exports = new CartModel();
