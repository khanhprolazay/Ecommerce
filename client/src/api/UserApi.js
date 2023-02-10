import { createConfigWithToken } from '../utils';
import axiosClient from './axiosClient';

class UserApi {
	login = async (username, password) => {
		const data = { username, password };
        const url = `${process.env.REACT_APP_API_AUTH_SERVER_URL}/login`;
		return axiosClient.post(url, data);
	};

	logout = async (username) => {
		const url = `${process.env.REACT_APP_API_AUTH_SERVER_URL}/logout`;
		const data = { username };
		return axiosClient.post(url, data);
	}

	updateLocation = async (username, location) => {
		const url = `${process.env.REACT_APP_API_AUTH_SERVER_URL}/updateLocation`;
		const config = createConfigWithToken();
		const data = { username, location };
		return axiosClient.post(url, data, config);
	}
}

const userApi = new UserApi();
export default userApi;
