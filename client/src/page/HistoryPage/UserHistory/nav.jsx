import '../../../assets/css/UserHistory.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../../redux/slice/FilterSlice';

function Nav() {
	const dispath = useDispatch();
	const handleChange = (state) => { dispath(filterSlice.actions.setStatus(state)) };

	return (
		<div className='wrapper'>
			<nav>
				<input
					type='radio'
					name='tab'
					id='history-all'
					defaultChecked={true}
				/>
				<input
					type='radio'
					name='tab'
					id='history-cart'
				/>
				<input
					type='radio'
					name='tab'
					id='history-delivering'
				/>
				<input
					type='radio'
					name='tab'
					id='history-delivered'
				/>
				<input
					type='radio'
					name='tab'
					id='history-cancelled'
				/>
				<label
					htmlFor='history-all'
					className='history-all'
					onClick={() => handleChange('all')}>
					<p>ALL</p>
				</label>
				<label
					htmlFor='history-cart'
					className='history-cart'
					onClick={() => handleChange('in_cart')}>
					<p>CART</p>
				</label>
				<label
					htmlFor='history-delivering'
					className='history-delivering'
					onClick={() => handleChange('on_shipping')}>
					<p>DELIVERING</p>
				</label>
				<label
					htmlFor='history-delivered'
					className='history-delivered'
					onClick={() => handleChange('shipped')}>
					<p>DELIVERED</p>
				</label>
				<label
					htmlFor='history-cancelled'
					className='history-cancelled'
					onClick={() => handleChange('cancelled')}>
					<p>CANCELLED</p>
				</label>
				<div className='tab'></div>
			</nav>
		</div>
	);
}

export default React.memo(Nav, () => true);
