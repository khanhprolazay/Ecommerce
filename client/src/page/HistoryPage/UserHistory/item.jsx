import '../../../assets/css/HistoryItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTruckFast,
	faTruck,
	faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { formatCash } from '../../../utils/index';

function Item(props) {
	const item = props.item;
	const total = item.quantity * (item.price * (1 - item.discount));

	return (
		<div
			className='container-item'
			style={{
				flexDirection: 'column',
				width: '100%',
				backgroundColor: 'white',
				boxShadow: '0 5px 10px rgba(0,0,0,0.25)',
                borderRadius: '10px',
			}}>
			<div
				className='container-item width'
				style={{ padding: '16px 0', borderBottom: '1px solid black' }}>
				<div
					className='container-item'
					style={{ gap: '0 11px' }}>
					<div className='mall'>Mall</div>
					<div className='shopname'>Shop name</div>
				</div>
				{function () {
					switch (item.status) {
						case 'shipped':
							return (
								<div
									className='container-item status'
									style={{ gap: '0 21px' }}>
									<FontAwesomeIcon
										icon={faTruck}
										style={{
											fontSize: '20px',
											color: '#3EA835',
										}}
									/>
									<div className='status-desc'>Giao hàng thành công</div>
								</div>
							);
						case 'cancelled':
							return <div className='status-desc not-success'>ĐÃ HỦY</div>;
						case 'on_shipping':
							return (
								<div
									className='container-item status'
									style={{ gap: '0 21px' }}>
									<FontAwesomeIcon
										icon={faTruckFast}
										style={{
											fontSize: '20px',
											color: '#3EA835',
										}}
									/>
									<div className='status-desc'>Đang giao</div>
								</div>
							);
						case 'in_cart':
							return (
								<div
									className='container-item status'
									style={{ gap: '0 21px' }}>
									<FontAwesomeIcon
										icon={faCartPlus}
										style={{
											fontSize: '20px',
											color: '#3EA835',
										}}
									/>
									<div className='status-desc'>Trong giỏ hàng</div>
								</div>
							);
						default:
							return <div></div>;
					}
				}.call(this)}
			</div>
			<div
				className='container-item width'
				style={{ padding: '16px 0' }}>
				<div
					className='container-item'
					style={{ gap: '0 11px' }}>
					<img
						src={item.image}
						alt='item-img'
					/>
					<div
						className='container-item'
						style={{ flexDirection: 'column', alignItems: 'start' }}>
						<div className='iuyhb'>{item.productName}</div>
						<div style={{ color: 'grey' }}>
							Phân loại hàng: {item.color}, {item.size}
						</div>
						<div>x{item.quantity}</div>
					</div>
				</div>
				<div className='item-price-history'>
					{formatCash(item.price * (1 - item.discount))}đ
				</div>
			</div>
			<div className='horizontal-line'></div>
			<div className='container-item width total'>
				<div className='total-content'>Tổng số tiền:</div>
				<div className='total-amount'>{formatCash(total)}đ</div>
			</div>
			<div className='container-item width item-button'>
				<div className='button again'>Mua lại</div>
			</div>
		</div>
	);
}
export default Item;
