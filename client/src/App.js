import { Routes, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import LoginPage from './page/LoginPage';
import HistoryPage from './page/HistoryPage';
import PurchasedPage from './page/PurchasedPage';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './redux/selectors';
import { isEmptyObject } from './utils/index';
import { useEffect } from 'react';
import axios from 'axios';
import { itemsSlice } from './redux/slice/ItemsSlice';


function App() {
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get('http://localhost:5000/items/getNumberOfAllItems')
			.then((data) => dispatch(itemsSlice.actions.setNumberItems(data.data.number)));
	})

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path='/login'
					element={user === null || isEmptyObject(user) ? <LoginPage /> : <LandingPage />}
				/>
				<Route
					path='/history'
					element={
						user === null || isEmptyObject(user) ? <LoginPage /> : <HistoryPage />
					}
				/>
				<Route
					path='/purchase'
					element={
						user === null || isEmptyObject(user) ? (
							<LoginPage />
						) : (
							<PurchasedPage user={user} />
						)
					}
				/>
			</Routes>
		</div>
	);
}
export default App;
