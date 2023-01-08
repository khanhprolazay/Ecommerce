import { createSlice } from '@reduxjs/toolkit';

const initUser = JSON.parse(localStorage.getItem('user'));
let initState = {};

if (initUser !== null) {
	initState = {
		_id: initUser._id,
		username: initUser.username,
		fullname: initUser.fullname,
		image: initUser.image,
		number: initUser.number,
	};
}

// Storage user infomation
export const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		set: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload));
			state._id = action.payload._id;
			state.username = action.payload.username;
			state.fullname = action.payload.fullname;
			state.image = action.payload.image;
			state.number = action.payload.number;
		},
		delete: (state, action) => {
			localStorage.setItem('user', null);
			return {};
		}
	}
})