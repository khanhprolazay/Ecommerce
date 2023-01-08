import { createSlice } from "@reduxjs/toolkit";

const initState = {
    byStatus: 'all'
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initState,
    reducers: {
        setStatus: (state, action) => {
            state.byStatus = action.payload;
        }
    }
})