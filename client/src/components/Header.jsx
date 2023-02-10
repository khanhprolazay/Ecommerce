import '../assets/css/Header.css';
import CartIcon from './CartIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header(props) {
	const user = props.user;
	const numberItemInCart = 1;

	return (
		<header>
			<div className='container-1056 header'>
				<div
					className='container-item'
					style={{ gap: '0 5px', cursor: 'pointer' }}>
					<FontAwesomeIcon
						icon={faBell}
						className='header-icon'
					/>
					<div className='notify'>Thông báo</div>
				</div>
				<div
					className='container-item'
					style={{ gap: '0 5px', cursor: 'pointer' }}>
					<FontAwesomeIcon
						icon={faCircleQuestion}
						className='header-icon'
					/>
					<div className='notify'>Hỗ trợ</div>
				</div>
				{/* <Link to='/purchase'><FontAwesomeIcon icon={faBagShopping} className="header-icon" /></Link> */}
				<CartIcon style={{ width: '20px', height: '20px', color: 'white' }}>
					{numberItemInCart}
				</CartIcon>
				<Link to='/history'>
					<div
						className='container-item'
						style={{ gap: '0 5px' }}>
						<img
							src={user.image}
							alt='avatar'
						/>
						<div className='notify'>{user.username}</div>
					</div>
				</Link>
			</div>
		</header>
	);
}
export default Header;
