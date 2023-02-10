import { formatCash } from '../../utils';
import {
	faTruckFast,
	faArrowTrendDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsSlice } from '../../redux/slice/ItemsSlice';

function Item(props) {
	const item = props.item;
	const setDeleteItem = props.setDeleteItem;
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(item.quantity);

	const priceAfterDiscount = item.price - item.price * item.discount;

	//Caculate shipfee & price after changing quantity
	const changeQuantity = (value) => {
		let temp = quantity + value;

		// If changed quantity is greater than its quantity in stock,
		// the changes will not be done.
		if (temp > item.stockQuantity) {
			return;
		}

		let shipFeeChange = 0;
		let quantityChange = 0;

		// Update shipfee and quantity
		if (temp < 0) {
			return;
		} else if (temp === 0) {
			// shipFeeChange = 0;
			// quantityChange = 0;
			setDeleteItem(item);
			return;
		} else {
			shipFeeChange = 12000;
			quantityChange = temp;
		}

		setQuantity(temp);

		// Update the new user item list to redux store and localStorage
		dispatch(
			itemsSlice.actions.userItemsUpdateQuantity({
				itemId: item.itemId,
				quantity: quantityChange,
				shipFee: shipFeeChange,
			})
		);
	};

	return (
		<div className='cart-page-item'>
			<div className='cart-page-item-shop-container'>
				<div>Mall</div>
				<p>Shop Name</p>
			</div>
			<div style={{ padding: '0 20px', width: '100%' }}>
				<div className='cart-page-item-infor-container'>
					<div
						className='flex-center'
						style={{ width: '46.27949%' }}>
						<img
							src={item.image}
							alt='cart-page-item'
						/>
						<div
							className='flex-start'
							style={{ height: '88px', width: '80%', flexDirection: 'column' }}>
							<h2>{item.productName}</h2>
							<div
								className='flex-start'
								style={{ gap: '0 5px', padding: '0 5px' }}>
								<FontAwesomeIcon
									icon={faArrowTrendDown}
									style={{ color: 'var(--red-color)' }}
								/>
								<p>{Math.round(item.discount * 100)}%</p>
							</div>
						</div>
						<div className='cart-page-category-select'>
							<p>
								Phân Loại Hàng: <button></button>
							</p>
							<div>
								{item.color}, {item.size}
							</div>
						</div>
					</div>
					<div
						className='flex-center'
						style={{ width: '15.4265%', flexDirection: 'column' }}>
						<p className='price'>{formatCash(item.price)}đ</p>
						<p className='discountprice'>{formatCash(priceAfterDiscount)}đ</p>
					</div>
					<div
						className='flex-center'
						style={{ width: '15.4265%' }}>
						<div
							className='container-item quatity'
							style={{ width: '80%' }}>
							<div
								className='quatity-item'
								style={{
									width: '25%',
									borderRight: '1px solid rgba(0,0,0,.09)',
									cursor: 'pointer',
								}}
								onClick={() => changeQuantity(-1)}>
								-
							</div>
							<div
								className='quatity-item'
								style={{
									width: '50%',
									borderRight: '1px solid rgba(0,0,0,.09)',
								}}>
								{item.quantity}
							</div>
							<div
								className='quatity-item'
								style={{ width: '25%', cursor: 'pointer' }}
								onClick={() => changeQuantity(1)}>
								+
							</div>
						</div>
					</div>
					<div
						className='flex-center'
						style={{
							width: '10.43557%',
							fontSize: '14px',
							color: 'var(--red-color)',
						}}>
						{formatCash(quantity * priceAfterDiscount)}đ
					</div>
					<div
						className='flex-center'
						style={{ width: '12.70417%', fontSize: '14px' }}
						onClick={() => setDeleteItem(item)}>
						Xóa
					</div>
				</div>
			</div>
			<div className='cart-page-shipping-container'>
				<FontAwesomeIcon
					icon={faTruckFast}
					style={{ color: '#00bfa5' }}
				/>
				<p>
					Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫25.000 phí
					vận chuyển đơn tối thiểu ₫99.000
				</p>
				<button>
					Tìm hiểu thêm
					<div className='cart-page-shipping-popup'>
						<div className='cart-page-shipping-popup-container'>
							<h4>Khuyến mãi vận chuyển</h4>
							<div className='cart-page-shipping-popup-category'>
								<p
									className='flex-start'
									style={{ width: '30%' }}>
									Đơn hàng tối thiểu
								</p>
								<p
									className='flex-start'
									style={{ width: '30%' }}>
									Ưu đãi
								</p>
								<p
									className='flex-start'
									style={{ width: '40%' }}>
									Phương thức vận chuyển
								</p>
							</div>
							<div
								className='cart-page-shipping-popup-category'
								style={{ marginTop: '10px' }}>
								<p
									className='flex-start text-color'
									style={{ width: '30%' }}>
									{formatCash(50000)}đ
								</p>
								<p
									className='flex-start text-color'
									style={{ width: '30%' }}>
									{formatCash(15000)}đ
								</p>
								<p
									className='flex-start text-color'
									style={{ width: '40%' }}>
									Nhanh
								</p>
							</div>
							<div
								className='cart-page-shipping-popup-category'
								style={{ marginTop: '10px' }}>
								<p
									className='flex-start text-color'
									style={{ width: '30%' }}>
									{formatCash(99000)}đ
								</p>
								<p
									className='flex-start text-color'
									style={{ width: '30%' }}>
									{formatCash(25000)}đ
								</p>
								<p
									className='flex-start text-color'
									style={{ width: '40%' }}>
									Nhanh
								</p>
							</div>
							<div className='cart-page-shipping-popup-container-decoration'></div>
						</div>
					</div>
				</button>
			</div>
		</div>
	);
}

export default Item;
