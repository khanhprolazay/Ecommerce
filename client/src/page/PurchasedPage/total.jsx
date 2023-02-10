import '../../assets/css/PurchasedTotal.css';
import { formatCash, distance } from '../../utils/index';
import { itemsSlice } from '../../redux/slice/ItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getItemsInCart } from '../../redux/selectors';
import SuccessPopup from '../../components/Popup/SuccessPopup';
import ErrorPopup from '../../components/Popup/ErrorPopup';
import Loading from '../../components/Loading';
import { useState } from 'react';
import cartApi from '../../api/CartApi';

function Total() {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const cart = useSelector(getItemsInCart);
	const shopLocation = JSON.parse(localStorage.getItem('shopLocation'));
	const [state, setState] = useState({
		state: 'init',
		message: '',
		closePopup: '',
	});

	let distanceBetween2Point = Math.round(
		distance(
			user.location.location.lat,
			user.location.location.lng,
			shopLocation.location.lat,
			shopLocation.location.lng
		)
	);

	let totalItemPrice = 0;
	let total = 0;
	let totalShipFee = distanceBetween2Point * 12000;

	cart.forEach((item) => {
		let priceAfterDiscount = item.price * (1 - item.discount) * item.quantity;
		totalItemPrice += priceAfterDiscount;
		total += item.shipFee + priceAfterDiscount;
	});

	const closePopup = () => setState({ ...state, state: 'init' });
	const order = async () => {
		setState({ ...state, state: 'loading', closePopup: () => true });

		cartApi.order(user.username, cart).then(() => {
			// Order successfully. 
			// Request to server to get cart again and store
			cartApi.getCartByUsername(user.username).then((response) => {
				dispatch(itemsSlice.actions.setUserItems(response));
				setState({
					...state,
					state: 'success',
					message: 'Đặt hàng thành công',
					closePopup: closePopup,
				});
			});
		}).catch(err => {
			setState({
				...state,
				state: 'error',
				message: err.message,
				closePopup: closePopup,
			})
		});
		
	};

	return (
		<div
			className='container-1056 purchase-method'
			style={{ backgroundColor: 'white' }}>
			<div
				className='container-item container-padding'
				style={{ paddingBottom: '15px' }}>
				<div className='method-heading'>Phương thức thanh toán</div>
				<div
					className='container-item'
					style={{ width: '38.247%' }}>
					<div className='method-content'>Thanh toán khi nhận hàng</div>
					<div className='method-change'>THAY ĐỔI</div>
				</div>
			</div>
			<div
				className='container-item container-padding'
				style={{
					flexDirection: 'column',
					alignItems: 'end',
					gap: '15px 0',
					borderTop: '1px dashed #34251F',
					paddingTop: '21px',
				}}>
				<div
					className='container-item'
					style={{ width: '38.247%' }}>
					<div className='method-content'>Tổng tiền hàng: </div>
					<div
						className='method-change'
						style={{ color: 'black' }}>
						{formatCash(totalItemPrice)}đ
					</div>
				</div>
				<div
					className='container-item'
					style={{ width: '38.247%' }}>
					<div className='method-content'>
						Phí vận chuyển ({distanceBetween2Point}km):{' '}
					</div>
					<div
						className='method-change'
						style={{ color: 'black' }}>
						{formatCash(totalShipFee)}đ
					</div>
				</div>
				<div
					className='container-item'
					style={{ width: '38.247%' }}>
					<div className='method-content'>Tổng thanh toán: </div>
					<div
						className='method-change'
						style={{ color: 'black' }}>
						{formatCash(total)}đ
					</div>
				</div>
				<button
					className='button order'
					onClick={order}>
					ĐẶT HÀNG
				</button>
			</div>
			{function () {
				switch (state.state) {
					case 'loading':
						return <Loading />;
					case 'success':
						return <SuccessPopup state={state} />;
					case 'error':
						return <ErrorPopup state={state} />;
					default:
						return;
				}
			}.call(this)}
		</div>
	);
}
export default Total;
