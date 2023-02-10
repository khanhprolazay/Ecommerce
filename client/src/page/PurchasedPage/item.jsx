import '../../assets/css/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { formatCash } from '../../utils/index';

function Item(props) {
	let item = props.item;

	const priceAfterDiscount = item.price - item.price * item.discount;

	return (
		<div className='container-1056 cart-item'>
			<div
				className='container-item container-padding'
				style={{
					position: 'relative',
					paddingTop: '58px',
					paddingBottom: '40px',
				}}>
				<div
					className='container-item'
					style={{
						gap: '0px 11px',
						width: '37.401%',
						justifyContent: 'flex-start',
					}}>
					<img
						src={item.image}
						style={{ width: '48px', height: '48px' }}
						alt=''
					/>
					<p className='name'>{item.productName}</p>
				</div>
				<div className='option'>
					Loại: {item.color}, {item.size}
				</div>
				<div
					className='id-item'
					style={{ width: '14.802%', color: 'black' }}>
					{formatCash(priceAfterDiscount)}đ
				</div>
				<div
					className='container-item'
					style={{ width: '12.203%' }}>
					<div
						className='quatity-item'
						style={{ width: '100%' }}>
						{item.quantity}
					</div>
				</div>
				<div
					className='id-item'
					style={{
						width: '11.977%',
						textAlign: 'end',
						color: 'black',
					}}>
					{formatCash(item.quantity * priceAfterDiscount)}đ
				</div>
				<div className='container-item shop'>
					<div className='mall'>Mall</div>
					<div className='shopname'>Shop name</div>
				</div>
			</div>
			<div className='container-item container-padding voucher'>
				<div
					className='container-item'
					style={{ paddingTop: '13.31px', paddingBottom: '13.31px' }}>
					<FontAwesomeIcon
						icon={faTag}
						style={{ width: '19.17px', height: '21.26px' }}
					/>
					<div className='shopvoucher'>Voucher của Shop</div>
				</div>
				<div className='choosevoucher'>Chọn Voucher</div>
			</div>
			<div className='container-item container-padding shipment'>
				<div
					className='container-item'
					style={{
						width: '59.182%',
						paddingTop: '10px',
						paddingBottom: '36.6px',
						borderLeft: '1px dashed #34251F',
						justifyContent: 'space-between',
					}}>
					<div className='shipment-company'>Đơn vị vận chuyển:</div>
					<div
						className='container-item'
						style={{ position: 'relative', width: '24.815%' }}>
						<div className='shipment-desc'>Nhanh</div>
						<div className='shipment-time'>Thời gian nhận hàng</div>
					</div>
					<div className='shipment-change'>THAY ĐỔI</div>
					<div className='shipment-price'>{formatCash(item.shipFee)}</div>
				</div>
			</div>
			<div className='container-item container-padding item-price-cart'>
				<div className='itemprice-heading'>Tổng số tiền:</div>
				<div className='itemprice-amount'>
					{formatCash(item.quantity * priceAfterDiscount + item.shipFee)}đ
				</div>
			</div>
		</div>
	);
}
export default Item;
