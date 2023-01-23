import React from 'react';

function Nav(props) {
	const changeTab = props.changeTab;

	return (
		<nav className='container-1139 category-container'>
			<input
				type='radio'
				name='tab'
				id='ourproduct-hot'
				defaultChecked={true}
			/>
			<input
				type='radio'
				name='tab'
				id='ourproduct-sale'
			/>
			<input
				type='radio'
				name='tab'
				id='ourproduct-new'
			/>
			<label
				className='ourproduct-category-item'
				htmlFor='ourproduct-hot'
				onClick={() => changeTab('hot')}>
				<p>HOT</p>
			</label>
			<label
				className='ourproduct-category-item'
				htmlFor='ourproduct-sale'
				onClick={() => changeTab('sale')}>
				<p>ON SALE</p>
			</label>
			<label
				className='ourproduct-category-item'
				htmlFor='ourproduct-new'
				onClick={() => changeTab('new')}>
				<p>NEW ARRIVAL</p>
			</label>
			<div className='ourproduct-nav-tab'></div>
		</nav>
	);
}

export default React.memo(Nav, () => true);
