import Star from '../Start';
import CustomPopup from '../CustomPopup';
import { useState } from 'react';
import { formatCash } from '../../utils/index';

function BestSellerItem(props) {
    const item = props.item;
    const styleContainer = { margin: '0 0' };
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className='container-1139 card' onClick={() => { setOpenPopup(true) }}>
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
            <CustomPopup openPopup={openPopup} setOpenPopup={setOpenPopup} item={item}/>
        </div>
    );
}
export default BestSellerItem;
