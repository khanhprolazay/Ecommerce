import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getItemsInCart, getNumberOfItemsInCart } from '../../redux/selectors';
import { formatCash } from '../../utils';
import { Link } from 'react-router-dom';

function Total() {
	const cart = useSelector(getItemsInCart);
	const numberItemsInCart = useSelector(getNumberOfItemsInCart);

	let total = 0;

	cart.forEach((item) => {
		let priceAfterDiscount = item.price * (1 - item.discount) * item.quantity;
		total += item.shipFee + priceAfterDiscount;
	});

	return (
		<div className='container-1056 cart-page-total-container'>
			<div className='cart-page-total-voucher'>
				<div
					className='flex-start'
					style={{ width: '60%' }}>
					<div
						className='flex-start'
						style={{ width: '60%', gap: '0 5px' }}>
						<FontAwesomeIcon icon={faTags} />
						<p>Shop Voucher</p>
					</div>
					<div
						className='flex-end'
						style={{ width: '40%', alignItems: 'center' }}>
						<button>Chọn Hoặc Nhập Mã</button>
					</div>
				</div>
			</div>
			<div className='cart-page-total-confirm'>
				<div
					className='flex-start'
					style={{ width: '60%' }}>
					<div
						className='flex-start'
						style={{ width: '60%', alignItems: 'center', gap: '0 5px' }}>
						<p>Tổng thanh toán ( {numberItemsInCart} sản phẩm ): </p>
						<p className='red-color'>{formatCash(total)}đ</p>
					</div>
					<div
						className='flex-end'
						style={{ width: '40%', alignItems: 'center' }}>
						<Link to='/purchase'>
							<button>THANH TOÁN</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Total;
