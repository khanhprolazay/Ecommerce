import Star from '../../../components/Start';
import { useDispatch } from 'react-redux';
import { formatCash } from '../../../utils/index';
import { itemsSlice } from '../../../redux/slice/ItemsSlice';

function OurProductItem(props) {
	const item = props.item;
	const dispatch = useDispatch();

	return (
		<div
			className='cart product-card'
			onClick={() => dispatch(itemsSlice.actions.setPopupItem(item))}>
			<img
				src={item.image}
				alt='ourproduct-img'
			/>
			<div className='card-content-container card-content-container--outproduct'>
				<div className='container-1139 ourproduct-rate-container'>
					<Star rating={item.rating} />
				</div>
				<h3 className='card-item-name'>{item.category}</h3>
				<div className='container-1139 price-container--ourproduct'>
					<p className='price'>{formatCash(item.price)}đ</p>
					<p className='discountprice'>
						{formatCash(item.price * (1 - item.discount))}đ
					</p>
				</div>
			</div>
		</div>
	);
}
export default OurProductItem;
