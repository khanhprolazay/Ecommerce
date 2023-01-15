import '../assets/css/AvatarAndOption.css';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Document from '../components/Document';
import UserHistory from '../components/UserHistory/index';
import Footer from '../components/Footer';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendar,
	faBell,
	faUser,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../redux/selectors';
import { userSlice } from '../redux/slice/UserSlice';
import { itemsSlice } from '../redux/slice/ItemsSlice';
import { useDispatch, useSelector } from 'react-redux';

function HistoryPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const [option, setOption] = useState('history');
	const [childOption, setChildOption] = useState('document');

	const logout = () => {
		const accessToken = localStorage.getItem('accessToken');
		axios
			.post('http://localhost:5500/logout', {
				username: user.username,
				token: accessToken,
			})
			.then(() => {
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
			<section>
				<div
					className='container-1056'
					style={{ alignItems: 'start', justifyContent: 'space-around' }}>
					<div
						className='container-1056 avatar-option'
						style={{ margin: '0 0', gap: '32px 0' }}>
						<div
							className='container-item'
							style={{ gap: '0 5px', padding: '16px 0' }}>
							<img
								src={user.image}
								alt='category-avatar'
							/>
							<div className='category-content'>{user.fullname}</div>
						</div>
						<div
							className='container-item'
							style={{ gap: '10px 0px', flexDirection: 'column' }}>
							<div
								className='container-item'
								style={{ gap: '0 10px' }}>
								<FontAwesomeIcon
									icon={faUser}
									className='category-icon'
								/>
								<div
									className='category-content'
									onClick={() => {
										setChildOption('document');
										setOption('my-account');
									}}>
									Tài khoản của tôi
								</div>
							</div>
							{function () {
								if (option === 'my-account')
									return (
										<div
											className='container-item'
											style={{
												gap: '10px 0',
												flexDirection: 'column',
											}}>
											<div
												className={
													childOption === 'document'
														? 'account-chirdren-option checked'
														: 'account-chirdren-option'
												}
												onClick={() => setChildOption('document')}>
												Hồ sơ
											</div>
											<div
												className={
													childOption === 'bank'
														? 'account-chirdren-option checked'
														: 'account-chirdren-option'
												}
												onClick={() => setChildOption('bank')}>
												Ngân hàng
											</div>
											<div
												className={
													childOption === 'address'
														? 'account-chirdren-option checked'
														: 'account-chirdren-option'
												}
												onClick={() => setChildOption('address')}>
												Địa chỉ
											</div>
											<div
												className={
													childOption === 'password'
														? 'account-chirdren-option checked'
														: 'account-chirdren-option'
												}
												onClick={() => setChildOption('password')}>
												Mật khẩu
											</div>
										</div>
									);
							}.call(this)}
						</div>
						<div
							className='container-item'
							style={{ gap: '0 10px' }}>
							<FontAwesomeIcon
								icon={faCalendar}
								className='category-icon'
							/>
							<div
								className={
									option === 'history'
										? 'category-content checked'
										: 'category-content'
								}
								onClick={() => {
									setOption('history');
								}}>
								Đơn mua
							</div>
						</div>
						<div
							className='container-item'
							style={{ gap: '0 10px' }}>
							<FontAwesomeIcon
								icon={faBell}
								className='category-icon'
							/>
							<div
								className={
									option === 'notify'
										? 'category-content checked'
										: 'category-content'
								}
								onClick={() => {
									setOption('notify');
								}}>
								Thông báo
							</div>
						</div>
						<div
							className='container-item'
							style={{ gap: '0 10px' }}>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								className='category-icon'
							/>
							<div
								className={
									option === 'logout'
										? 'category-content checked'
										: 'category-content'
								}
								onClick={logout}>
								Đăng xuất
							</div>
						</div>
					</div>
					{function () {
						switch (option) {
							case 'history':
								return <UserHistory />;
							case 'my-account':
								return <Document />;
							default:
								return <div style={{ height: '600px' }}></div>;
						}
					}.call(this)}
				</div>
			</section>
			<Footer />
		</div>
	);
}
export default HistoryPage;
