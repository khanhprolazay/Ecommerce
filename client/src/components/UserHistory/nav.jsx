import '../../assets/css/UserHistory.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../redux/slice/FilterSlice';

function Nav()  {
    const dispatch = useDispatch();

    const handleStatusChange = (tab) => {
        dispatch(filterSlice.actions.setStatus(tab));
    }

	return (
		<nav className='history-menu'>
			<input
				type='radio'
				name='tab'
				id='all'
				checked
			/>
			<input
				type='radio'
				name='tab'
				id='in_cart'
			/>
			<input
				type='radio'
				name='tab'
				id='on_shipping'
			/>
			<input
				type='radio'
				name='tab'
				id='shipped'
			/>
			<input
				type='radio'
				name='tab'
				id='cancelled'
			/>
			<label
				htmlFor='all'
				className={'history-menu-link all'}
				onClick={() => handleStatusChange('all')}
				style={{ width: '18%' }}>
				Tất cả
			</label>
			<label
				htmlFor='in_cart'
				className={'history-menu-link in_cart'}
				onClick={() => handleStatusChange('in_cart')}
				style={{ width: '28%' }}>
				Trong giỏ hàng
			</label>
			<label
				htmlFor='on_shipping'
				className={'history-menu-link on_shipping'}
				onClick={() => handleStatusChange('on_shipping')}
				style={{ width: '18%' }}>
				Đang giao
			</label>
			<label
				htmlFor='shipped'
				className={'history-menu-link shipped'}
				onClick={() => handleStatusChange('shipped')}
				style={{ width: '18%' }}>
				Đã giao
			</label>
			<label
				htmlFor='cancelled'
				className={'history-menu-link cancelled'}
				onClick={() => handleStatusChange('cancelled')}
				style={{ width: '18%' }}>
				Đã hủy
			</label>
			<div className='tab'></div>
		</nav>
	);
}

export default React.memo(Nav);
