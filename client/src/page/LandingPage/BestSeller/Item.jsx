import Star from '../../../components/Stars';
import { useDispatch } from 'react-redux';
import { formatCash } from '../../../utils/index';
import { itemsSlice } from "../../../redux/slice/ItemsSlice";

function BestSellerItem(props) {
    const item = props.item;
    const dispatch = useDispatch();
    const styleContainer = { margin: '0 0' };

    return (
        <div className='container-1139 card' onClick={() => dispatch(itemsSlice.actions.setPopupItem(item))}>
            <img
                src={item.image}
                alt='bestseller-img'
            />
            <div className='container-1139 card-content-container'>
                <Star
                    rating={item.rating}
                    style={styleContainer}
                />
                <p className='card-item-name'>{item.category}</p>
                <div className='container-1139 price-container'>
                    <p className='price'>{formatCash(item.price)}đ</p>
                    <p className='discountprice'>
                        {formatCash(item.price - item.price * item.discount)}đ
                    </p>
                </div>
            </div>
        </div>
    );
}
export default BestSellerItem;
