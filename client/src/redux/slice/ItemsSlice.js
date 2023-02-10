import { createSlice } from "@reduxjs/toolkit";

const initState = {
	userItems: JSON.parse(localStorage.getItem('items')),
	numberItems: 0,
	popupItem: null
};

export const itemsSlice = createSlice({
	name: 'items',
	initialState: initState,
	reducers: {
		setUserItems: (state, action) => {
			// Set items in redux store and local storage
			localStorage.setItem('items', JSON.stringify(action.payload));
			state.userItems = action.payload;
		},

		deleteUserItems: (state, action) => {
			localStorage.setItem('items', null);
			state.userItems = null;
		},

		setPopupItem: (state, action) => {
			state.popupItem = action.payload;
		},

		deletePopupItem: (state, action) => {
			state.popupItem = null;
		},

		userItemsUpdateQuantity: (state, action) => {
			// Get information from action.payload
			const itemId = action.payload.itemId;
			const quantity = action.payload.quantity;
			const shipFee = action.payload.shipFee;
			
			//Update quantity and shipfee to items in redux store and local storage
			const index = state.userItems.findIndex(item => item.itemId === itemId && item.status === 'in_cart' );
			state.userItems[index].quantity = quantity;
			state.userItems[index].shipFee = shipFee;

			localStorage.setItem('items', JSON.stringify(state.userItems));
		},

		setNumberItems: (state, action) => {
			state.numberItems = action.payload;
		},

		deleteItemInCart: (state, action) => {
			state.userItems = state.userItems.filter(item => item.itemId !== action.payload.itemId);
			let user = JSON.parse(localStorage.getItem('user'));
			user = {...user, items: state.userItems};
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('items', JSON.stringify(state.userItems));
		}
	}
})

