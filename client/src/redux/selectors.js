import { createSelector } from '@reduxjs/toolkit';

export const getUser = (state) => state.user;

export const getUserItems = (state) => state.items.userItems;

export const getHotItems = (state) => state.items.hotItems;

export const getNewItems = (state) => state.items.newItems;

export const getSaleItems = (state) => state.items.saleItems;

export const getItemToPopup = (state) => state.items.popupItem;

export const getSortField = (state) => state.sort.field;

export const getNumberOfAllItems = (state) => state.items.numberItems;

export const getFilterByStatus = (state) => state.filter.byStatus;

export const getUserLocation = (state) => state.user.location;


export const getNumberOfItemsInCart = createSelector(
	getUserItems,
	(items) => {
		return items === null ? 0 : items.filter(item => item.status === 'in_cart').length;
	}
);

export const getItemsInCart = createSelector(
	getUserItems,
	(items) => {
		return items === null ? [] : items.filter(item => item.status === 'in_cart')
	}
);

export const getAllItemsAfterSort = createSelector(
	getHotItems,
	getNewItems,
	getSaleItems,
	getSortField,
	(items1, items2, items3, sortField) => {
		if (sortField === 'hot') return items1;
		if (sortField === 'new') return items2;
		if (sortField === 'sale') return items3;
	}
)

export const getItemsRemainingAfterFilter = createSelector(
	getUserItems,
	getFilterByStatus,
	(items, filterByStatus) => {
		return filterByStatus === 'all' ? items : items.filter(item => item.status === filterByStatus);
	}
)
