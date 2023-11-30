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
	const response = await axios.post(
		`${process.env.REACT_APP_API_SERVER_URL}/user/refreshToken`,
		body
	);
	return response.data.accessToken;
}

export const getLocalAccessToken = () => {
	return localStorage.getItem('accessToken');
};

export const getLocalRefreshToken = () => {
	return localStorage.getItem('refreshToken');
};

const isTokenExpried = (token) => {
	try {
		return jwt.decode(token).exp < Date.now() / 1000;
	} catch {
		return false;
	}
};

export const isAccessTokenExpried = () => {
	return isTokenExpried(getLocalAccessToken());
};

export const isRefreshTokenExpried = () => {
	return isTokenExpried(getLocalRefreshToken());
};

let refreshTokenRequest = null;
export const requestApi = async (url, data, config, method) => {
	// If refresh token is expried, return false
	if (isRefreshTokenExpried()) return false;

	// If not, check access token and call API
	const refreshToken = getLocalRefreshToken();

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
			authorization: 'Bear ' + getLocalAccessToken(),
		},
	};

	return method === 'post'
		? await axios.post(url, data, config)
		: await axios.get(url, config);
};

export const reverseGeocode = async (pos) => {
	const position = pos.lat.toString() + ',' + pos.lng.toString();
	const options = {
		method: 'GET',
		url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
		params: { location: position, language: 'en' },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_GEOCODE_KEY,
			'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
		},
	};

	let response = await axios.request(options);
	response = response.data.results;

	// Find first address of response (Array) if the address has 4 ,
	let address = '';
	let addressArray = [];
	let location = {};
	for (var index in response) {
		const addressTemp = response[index].address;
		const arrayTemp = addressTemp.split(',');
		if (arrayTemp.length === 5) {
			addressArray = arrayTemp;
			address = addressTemp;
			location = response[index].location;
			break;
		}
	}

	let result = {};
	result.country = addressArray[4];
	result.province = addressArray[3];
	result.district = addressArray[2];
	result.ward = addressArray[1];
	result.street = addressArray[0];
	result.address = address;
	result.location = location;

	return result;
};

export const geocode = async (address) => {
	const options = {
		method: 'GET',
		url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
		params: { address: address, language: 'en' },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_GEOCODE_KEY,
			'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
		},
	};

	const result = await axios.request(options);
	return result.data.results[0].location;
};

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

export const distance = (lat1, lon1, lat2, lon2) => {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
};

export const createConfigWithToken = () => {
	return { headers: { authorization: getLocalAccessToken() } };
};
