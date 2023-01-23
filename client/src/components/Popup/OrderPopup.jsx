import '../../assets/css/Popup.css';
import Star from '../Start';
import Loading from '../Loading';
import SuccessPopup from './SuccessPopup';
import ErrorPopup from './ErrorPopup';
import { formatCash, isEmptyObject } from '../../utils/index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { itemsSlice } from '../../redux/slice/ItemsSlice';
import { userSlice } from '../../redux/slice/UserSlice';
import { getItemsInCart, getItemToPopup  } from '../../redux/selectors';
import { requestApi } from '../../utils/index';
import { useState } from 'react';

function OrderPopup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const item = useSelector(getItemToPopup);
    const itemsInCart = useSelector(getItemsInCart);
    const [orderState, setOrderState] = useState({
        state: 'init',
        message: '',
        closePopup: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closePopup = () => {
        setOrderState({...orderState, state: 'init'});
        dispatch(itemsSlice.actions.deletePopupItem());
    }

    const closePopupWithEvent = (e) => {
        if (e.target.id === 'children') 
            closePopup(); 
    }

    const handleExpriedRefreshToken = () => {
        setOrderState({...orderState, state: 'init'});
        dispatch(itemsSlice.actions.deleteUserItems());
        dispatch(itemsSlice.actions.deletePopupItem());
        dispatch(userSlice.actions.delete());
        localStorage.clear();
        navigate('/login');
    }

    const addItemToCart = async () => {
        if (!user || isEmptyObject(user)) {
            handleExpriedRefreshToken();
            return;
        }

        setOrderState({...orderState, state: 'loading'});

        // If item in cart
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
            if (dataFromApi === false || dataFromApi.status === 401) {
                setOrderState({
                    ...orderState,
                    state: 'error',
                    message: 'Lỗi! Phiên đăng nhập đã hết hạn',
                    closePopup: handleExpriedRefreshToken,
                })
                return;
            }

            // if request api won't return false => cart is updated successfully
            // Make a request to get updated cart, then store them
            if (dataFromApi.status === 200) {
                const updatedCart = await requestApi(`http://localhost:5000/carts/${user.username}`, {}, {}, 'get');
                dispatch(itemsSlice.actions.setUserItems(updatedCart.data));
                setOrderState({
                    ...orderState,
                    state: 'success',
                    message: 'Đặt hàng thành công!',
                    closePopup: closePopup,
                })
            }
            else {
                setOrderState({
                    ...orderState,
                    state: 'error',
                    message: 'Lỗi! Vui lòng thử lại',
                    closePopup: closePopup,
                })
            }
        }
        else {
            setOrderState({
                ...orderState,
                state: 'error',
                message: 'Sản phẩm đã có sẵn trong giỏ hàng',
                closePopup: closePopup,
            })
        }

    }

    // If the popup item is null => not showing popup
    if (!item) 
        return <div></div>;

    // If the state is loading, return loading
    if (orderState.state === 'loading')   
        return <Loading /> 
    
    // If the state is error, return error
    if (orderState.state === 'error')
        return <ErrorPopup state={orderState} />

    // If the state is successful, return success
    if (orderState.state === 'success') 
        return <SuccessPopup state={orderState} />
    

    // Return the popup for customer could order item
    return (
        <div className='uiewr' >
            <div id='children' className="mainContnt" onClick={(e) => closePopupWithEvent(e)}>
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
                                    <button className='uwywa' onClick={() => dispatch(itemsSlice.actions.deletePopupItem())} style={{ backgroundColor: '#F3F3F3', color: '#34251F' }}>QUAY LẠI</button>
                                    <button className='uwywa' onClick={() => addItemToCart()}>ĐẶT HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPopup;