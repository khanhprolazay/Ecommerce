import '../../assets/css/Address.css';
import MapPopup from '../../components/Popup/MapPopup';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getUserLocation } from '../../redux/selectors';

function Address() {
	const user = JSON.parse(localStorage.getItem('user'));
	const [ isMapDisplay, setIsMapDisplay ] = useState(false);
	const defaultLocation = useSelector(getUserLocation);
	

	return (
		<section style={{ marginTop: '26px', marginBottom: '26px' }}>
			<div className='container-1056 container-padding location'>
				<div className='username-number'>
					{user.username} (+84) {user.number}
				</div>
				<div className='address'>
					{defaultLocation.address}
				</div>
				<div
					className='change'
					onClick={() => setIsMapDisplay(true)}>
					Thay Đổi
				</div>
				<div className='container-item address-heading'>
					<FontAwesomeIcon
						icon={faLocationDot}
						style={{
							color: 'var(--heavyblue-color)',
							fontSize: '25px',
						}}
					/>
					<div className='adrress-heading-content'>Địa Chỉ Nhận Hàng</div>
				</div>
			</div>
			<MapPopup
				isMapDisplay={isMapDisplay}
				setIsMapDisplay={setIsMapDisplay}
				defaultLocation={defaultLocation}
			/>
		</section>
	);
}
export default Address;
