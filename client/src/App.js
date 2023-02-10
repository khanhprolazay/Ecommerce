import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage/index';
import LoginPage from './page/LoginPage/index';
import HistoryPage from './page/HistoryPage/index';
import PurchasedPage from './page/PurchasedPage/index';
import CartPage from './page/CartPage/index';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './redux/selectors';
import { isEmptyObject } from './utils/index';
import { useEffect } from 'react';
import shopApi from './api/ShopApi';
import productApi from './api/ProductApi';
import * as dotenv from 'dotenv';
import { itemsSlice } from './redux/slice/ItemsSlice';

dotenv.config();

function App() {
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const isLogin = () => {
		return !(user === null || isEmptyObject(user));
	};

	useEffect(() => {
		productApi
			.getTotalProducts()
			.then((response) =>
				dispatch(itemsSlice.actions.setNumberItems(response.number))
			);
			
		shopApi
			.getShopLocation()
			.then((response) =>
				localStorage.setItem('shopLocation', JSON.stringify(response))
			);
	});

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path='/login'
					element={isLogin() ? <LandingPage /> : <LoginPage />}
				/>
				<Route
					path='/cart'
					element={isLogin() ? <CartPage /> : <LoginPage />}
				/>
				<Route
					path='/history'
					element={isLogin() ? <HistoryPage /> : <LoginPage />}
				/>
				<Route
					path='/purchase'
					element={isLogin() ? <PurchasedPage /> : <LoginPage />}
				/>
			</Routes>
		</div>
	);
}
export default App;
