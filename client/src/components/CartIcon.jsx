import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/CartIcon.css';
import { useSelector } from 'react-redux';
import { getNumberOfItemsInCart } from '../redux/selectors';

function CartIcon(props) {
    const count = useSelector(getNumberOfItemsInCart);

    return (
        <div>
            <Link
                to='/purchase'
                style={{ position: 'relative' }}
            >
                <FontAwesomeIcon
                    className='button-cart'
                    icon={faCartShopping}
                    style={props.style}
                />
                {function () {
                    if (count !== 0)
                        return (
                            <div className='number-item-cart'>
                                {count}
                            </div>
                        );
                }.call(this)}
            </Link>
        </div>
    );
}
export default CartIcon;
