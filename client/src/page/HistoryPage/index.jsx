import '../../assets/css/AvatarAndOption.css';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Document from './Information';
import Menu from './menu';
import UserHistory from './UserHistory/index';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/selectors';
import { userSlice } from '../../redux/slice/UserSlice';
import { itemsSlice } from '../../redux/slice/ItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/UserApi';

function HistoryPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const [option, setOption] = useState('my-account');

	const logout = () => {
		userApi.logout(user.username).then(() => {
			dispatch(itemsSlice.actions.setUserItems(null));
			dispatch(userSlice.actions.delete());
			localStorage.clear();
			navigate('/');
		});
	};

	return (
		<div style={{ backgroundColor: 'var(--gray-color)', marginTop: '25px' }}>
			<Header user={user} />
			<Logo location='Lịch sử' />
			<div className='history-wrapper'>
				<div className='history-menu-wrapper'>
					<div className='history-avatar-wrapper'>
						<img
							src={user.image}
							alt='category-avatar'
						/>
						<p>{user.username}</p>
					</div>
					<Menu
						setOption={setOption}
						logout={logout}
					/>
				</div>
				<div style={{ width: '100%', minHeight: '700px' }}>
					{function () {
						switch (option) {
							case 'history':
								return <UserHistory />;
							case 'my-account':
								return <Document />;
							default:
								return;
						}
					}.call(this)}
				</div>
			</div>
			<Footer />
		</div>
	);
}
export default HistoryPage;
