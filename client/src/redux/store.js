
import { configureStore } from '@reduxjs/toolkit';
import { itemsSlice } from './slice/ItemsSlice';
import { sortSlice } from './slice/SortSlice';
import { userSlice } from './slice/UserSlice';
import { filterSlice } from './slice/FilterSlice';

const store = configureStore({
    reducer: {
        sort: sortSlice.reducer,
        user: userSlice.reducer,
        items: itemsSlice.reducer,
        filter: filterSlice.reducer,
    }
})

export default store;
