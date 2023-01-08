import Star from '../Start';
import { useState } from 'react';
import CustomPopup from '../CustomPopup';
import { formatCash } from '../../utils/index';

function OurProductItem(props) {
    const item = props.item;
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className='cart product-card' onClick={() => { setOpenPopup(true) }}>
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
            <CustomPopup openPopup={openPopup} setOpenPopup={setOpenPopup} item={item}/>
        </div>
    );
}
export default OurProductItem;
