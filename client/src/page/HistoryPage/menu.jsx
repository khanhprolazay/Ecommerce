
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendar,
	faBell,
	faUser,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Menu(props) {
	const setOption = props.setOption;
	const logout = props.logout;

	return (
		<ul>
			<input
				type='radio'
				name='options'
				id='history-menu-account'
				defaultChecked={true}
			/>
			<input
				type='radio'
				name='options'
				id='history-menu-order'
			/>
			<input
				type='radio'
				name='options'
				id='history-menu-notify'
			/>
			<input
				type='radio'
				name='options'
				id='history-menu-logout'
			/>
			<li className='history-menu-account'>
				<FontAwesomeIcon
					className='history-menu-icon'
					icon={faUser}
				/>
				<label
					htmlFor='history-menu-account'
					onClick={() => setOption('my-account')}>
					My Account
				</label>
				<ul>
					<li>Document</li>
					<li>Bank</li>
					<li>Address</li>
					<li>Password</li>
				</ul>
			</li>
			<li className='history-menu-order'>
				<FontAwesomeIcon
					className='history-menu-icon'
					icon={faCalendar}
				/>
				<label
					htmlFor='history-menu-order'
					onClick={() => setOption('history')}>
					Order
				</label>
			</li>
			<li className='history-menu-notify'>
				<FontAwesomeIcon
					className='history-menu-icon'
					icon={faBell}
				/>
				<label
					htmlFor='history-menu-notify'
                    onClick={() => setOption('notify')}>
					Notification
				</label>
				<ul>
					<li>Submenu 1</li>
					<li>Submenu 2</li>
					<li>Submenu 3</li>
					<li>Submenu 4</li>
				</ul>
			</li>
			<li className='history-menu-logout'>
				<FontAwesomeIcon
					className='history-menu-icon'
					icon={faRightFromBracket}
				/>
				<label
					htmlFor='history-menu-logout'
					onClick={() => logout()}>
					Logout
				</label>
			</li>
		</ul>
	);
}

export default React.memo(Menu, () => true);
