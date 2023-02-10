import axiosClient from './axiosClient';
import { createConfigWithToken } from '../utils';

class CartApi {
	getCartByUsername = async (username) => {
		const url = `/cart/${username}`;
		const config = createConfigWithToken();
		return axiosClient.get(url, config);
	};

	deleteProduct = async (username, itemId) => {
		const url = '/cart/delete';
		const config = createConfigWithToken();
		const data = { username, itemId };
		return axiosClient.post(url, data, config);
	};

	insertProduct = async (data) => {
		const url = '/cart/put';
		const config = createConfigWithToken();
		return axiosClient.post(url, data, config);
	}

	order = async (username, cart) => {
		const url = '/cart/order';
		const data = { username, cart };
		const config = createConfigWithToken();
		return axiosClient.post(url, data, config);
	}
}

const cartApi = new CartApi();
export default cartApi;
