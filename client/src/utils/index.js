import axios from 'axios';
import jwt from 'jsonwebtoken';

export const isEmptyObject = (object) => {
	return Object.keys(object).length === 0;
};

export const countItem = () => {
	let countItem = 0;
	if (localStorage.hasOwnProperty('items')) {
		countItem = JSON.parse(localStorage.getItem('items').length);
	}
	return countItem;
};

export const formatCash = (cash) => {
	cash = Math.round(cash);
	var temp = cash.toString();
	return temp
		.split('')
		.reverse()
		.reduce((prev, next, index) => {
			return (index % 3 ? next : next + ',') + prev;
		});
};

export async function getNewAccessToken(refreshToken) {
	const body = { token: refreshToken };
	const datafromServer = await axios.post('http://localhost:5500/refreshToken', body);
	return datafromServer.data.accessToken;
}

const isTokenExpried = (token) => {
	return jwt.decode(token).exp < Date.now() / 1000;
};

const isAccessTokenExpried = () => {
	return isTokenExpried(localStorage.getItem('accessToken'));
};

const isRefreshTokenExpried = () => {
	return isTokenExpried(localStorage.getItem('refreshToken'));
};


let refreshTokenRequest = null;
export const requestApi = async (url, data, config, method) => {
	// If refresh token is expried, return false
	if (isRefreshTokenExpried()) return false;

	// If not, check access token and call API
	const refreshToken = localStorage.getItem('refreshToken');

	if (isAccessTokenExpried()) {
		refreshTokenRequest = refreshTokenRequest
			? refreshTokenRequest
			: getNewAccessToken(refreshToken);
		// 1 --> null --> refreshToken
		// 2 --> refreshToken --> refreshToken
		// 3 --> refreshToken --> refreshToken

		const newAccessToken = await refreshTokenRequest;
		refreshTokenRequest = null;

		// Store new access token
		localStorage.setItem('accessToken', newAccessToken);
	}

	//Call API
	config = {
		...config,
		headers: {
			...config.headers,
			authorization: 'Bear ' + localStorage.getItem('accessToken'),
		},
	};

	return method === 'post'
		? await axios.post(url, data, config)
		: await axios.get(url, config);
};
