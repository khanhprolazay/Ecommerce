import { createSlice } from "@reduxjs/toolkit";

const initState = {
	userItems: JSON.parse(localStorage.getItem('items')),
	numberItems: 0,
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

		userItemsUpdateQuantity: (state, action) => {
			// Get information from action.payload
			const orderId = action.payload.orderId;
			const quantity = action.payload.quantity;
			const shipFee = action.payload.shipFee;
			
			//Update quantity and shipfee to items in redux store and local storage
			const index = state.userItems.findIndex(item => item.orderId === orderId);
			state.userItems[index].orderId = orderId;
			state.userItems[index].quantity = quantity;
			state.userItems[index].shipFee = shipFee;

			localStorage.setItem('items', JSON.stringify(state.userItems));
		},

		setNumberItems: (state, action) => {
			state.numberItems = action.payload;
		}
	}
})

