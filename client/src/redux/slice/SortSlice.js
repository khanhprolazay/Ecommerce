import { createSlice } from "@reduxjs/toolkit";

const initState = {field: 'hot'};

// Field has 3 value: hot, new, sale
//If hot, sort items base on the item quantity that has been sold
// If new, sort items base on the day created of that item
// If sale, sort items base on the discount of that item
export const sortSlice = createSlice({
	name: 'sort',
	initialState: initState,
	reducers: {
		setField: (state, action) => {
			state.field = action.payload;
		}
	}
})