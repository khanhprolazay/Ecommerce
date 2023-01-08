import Popup from 'reactjs-popup';
import '../assets/css/Popup.css';
import Star from './Start';
import { formatCash } from '../utils/index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { itemsSlice } from '../redux/slice/ItemsSlice';
import { getUser, getItemsInCart } from '../redux/selectors';
import { requestApi } from '../utils/index';
import { userSlice } from '../redux/slice/UserSlice';

function CustomPopup(props) {
    const item = props.item;
    const openPopup = props.openPopup;
    const setOpenPopup = props.setOpenPopup;
    const user = useSelector(getUser);
    const itemsInCart = useSelector(getItemsInCart);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addItemToCart = async () => {
        if (user === null || Object.keys(user).length === 0) {
            navigate('/login');
            return;
        }

        // If item doesn't in cart
        if (!itemsInCart.some((itemInCart) => itemInCart._id === item._id)) {

            const data = {
                username: user.username,
                itemId: item._id,
                itemRev: item._rev,
                quantity: 1,
                size: 'XL',
                color: 'Đen',
            }

            /// If request API return false => refresh token expried => login
            const dataFromApi = await requestApi('http://localhost:5000/carts/put', data, {}, 'post');
            if (dataFromApi === false) {
                dispatch(itemsSlice.actions.deleteUserItems());
                dispatch(userSlice.actions.delete());
                localStorage.clear();
                navigate('/login');
                return;
            }

            // if request api won't return false => cart is updated successfully
            // Make a request to get updated cart, then store them
            if (dataFromApi.status === 200) {
                const updatedCart = await requestApi(`http://localhost:5000/carts/${user.username}`, {}, {}, 'get');
                dispatch(itemsSlice.actions.setUserItems(updatedCart.data));
            }
        }
        setOpenPopup(false);
    }

    return (
        <Popup open={openPopup} closeOnDocumentClick onClose={() => setOpenPopup(false)}>
            {() => (
                <div className="mainContnt modal">
                    <div className="box">
                        <div className="boxes bx1">
                            <img src={item.image} alt='popup'></img>
                        </div>
                        <div className="boxes bx2">
                            <div className='popup-col'>
                                <h1 className='popup-heading' style={{ marginBottom: 15 }}>ĐẶT HÀNG</h1>
                                <div className='container-1139 card-content-container' style={{ margin: '0 0', marginLeft: 37 }}>
                                    <p className='card-item-name popup-fontsize'>Sản phẩm: {item.category}</p>
                                    <div className='container-1139 price-container'>
                                        <p className='discountprice popup-fontsize'>Giá:</p>
                                        <p className='price popup-fontsize'>{formatCash(item.price)}đ</p>
                                        <p className='discountprice popup-fontsize'>
                                            {formatCash(item.price - item.price * item.discount)}đ
                                        </p>
                                    </div>
                                    <div className='popup-row discountprice popup-fontsize'>Đánh giá:
                                        <Star
                                            rating={item.rating}
                                            style={{ margin: '0 0' }}
                                        />
                                    </div>
                                </div>
                                <div className='container-1139 card-content-container' style={{ margin: '0 0', marginTop: 15 }}>
                                    <div className='popup-row'>
                                        <button className='uwywa' onClick={() => setOpenPopup(false)} style={{ backgroundColor: '#F3F3F3', color: '#34251F' }}>QUAY LẠI</button>
                                        <button className='uwywa' onClick={() => addItemToCart()}>ĐẶT HÀNG</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default CustomPopup;