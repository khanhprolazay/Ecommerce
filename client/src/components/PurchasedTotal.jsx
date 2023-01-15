import '../assets/css/PurchasedTotal.css';
import { formatCash } from '../utils/index';
import { useNavigate } from 'react-router-dom';
import { requestApi } from '../utils/index';
import { itemsSlice } from '../redux/slice/ItemsSlice';
import { userSlice } from '../redux/slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getItemsInCart } from '../redux/selectors';
import SuccessPopup from './Popup/SuccessPopup';
import ErrorPopup from './Popup/ErrorPopup';
import Loading from './Loading';
import { useState } from 'react';

function PurchasedTotal() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const cart = useSelector(getItemsInCart);
    const navigate = useNavigate();
    const [state, setState] = useState({ state: 'init', message: '', closePopup: '' });

    let totalItemPrice = 0;
    let totalShipFee = 0;
    let total = 0;

    cart.forEach((item) => {
        let priceAfterDiscount = item.price * (1 - item.discount) * item.quantity;
        totalItemPrice += priceAfterDiscount;
        totalShipFee += item.shipFee;
        total += item.shipFee + priceAfterDiscount;
    })

    const closePopup = () => {
        setState({ ...state, state: 'init' })
    }

    const order = async () => {
        setState({...state, state: 'loading', closePopup: () => true});
        const data = { username: user.username, cart: cart };

        requestApi('http://localhost:5000/carts/order', data, {}, 'post').then((result) => {
            if (result === false) { // Refresh token is expried => re-login
                dispatch(itemsSlice.actions.deleteUserItems());
                dispatch(userSlice.actions.delete());
                localStorage.clear();
                navigate('/login');
                return;
            }

            // Update card successfully. Request to server to get again cart and store
            if (result.status === 200) {
                requestApi(`http://localhost:5000/carts/${user.username}`, {}, {}, 'get')
                    .then((data) => {
                        dispatch(itemsSlice.actions.setUserItems(data.data));
                        setState({ ...state, state: 'success', message: 'Đặt hàng thành công', closePopup: closePopup });
                    })
            }
        }).catch((err) => setState({ ...state, state: 'erorr', message: err.message, closePopup: closePopup }));

    }

    return (
        <div
            className='container-1056 purchase-method'
            style={{ backgroundColor: 'white' }}
        >
            <div
                className='container-item container-padding'
                style={{ paddingBottom: '15px' }}
            >
                <div className='method-heading'>Phương thức thanh toán</div>
                <div
                    className='container-item'
                    style={{ width: '38.247%' }}
                >
                    <div className='method-content'>
                        Thanh toán khi nhận hàng
                    </div>
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
                }}
            >
                <div
                    className='container-item'
                    style={{ width: '38.247%' }}
                >
                    <div className='method-content'>Tổng tiền hàng: </div>
                    <div
                        className='method-change'
                        style={{ color: 'black' }}
                    >
                        {formatCash(totalItemPrice)}đ
                    </div>
                </div>
                <div
                    className='container-item'
                    style={{ width: '38.247%' }}
                >
                    <div className='method-content'>Phí vận chuyển: </div>
                    <div
                        className='method-change'
                        style={{ color: 'black' }}
                    >
                        {formatCash(totalShipFee)}đ
                    </div>
                </div>
                <div
                    className='container-item'
                    style={{ width: '38.247%' }}
                >
                    <div className='method-content'>Tổng thanh toán: </div>
                    <div
                        className='method-change'
                        style={{ color: 'black' }}
                    >
                        {formatCash(total)}đ
                    </div>
                </div>
                <button className='button order' onClick={order}>ĐẶT HÀNG</button>
            </div>
            {function () {
                switch (state.state) {
                    case 'loading': return <Loading />
                    case 'success': return <SuccessPopup state={state} />
                    case 'error':   return <ErrorPopup state={state} />
                    default:        return;
                }
            }.call(this)}
        </div>
    );
}
export default PurchasedTotal;
