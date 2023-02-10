import Map from '../Map';
import '../../assets/css/Popup.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../redux/slice/UserSlice';
import { geocode } from '../../utils';
import userApi from '../../api/UserApi';

function MapPopup(props) {
	const isMapDisplay = props.isMapDisplay;
	const setIsMapDisplay = props.setIsMapDisplay;
	const [defaultLocation, setDefaultLocation] = useState(props.defaultLocation);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const closePopupWithEvent = (e) => {
		if (e.target.id === 'children') {
			setDefaultLocation(props.defaultLocation);
			setIsMapDisplay(false);
		}
	};

	const handleAccept = () => {
		setIsLoading(true);
		const user = JSON.parse(localStorage.getItem('user'));
		userApi.updateLocation(user.username, defaultLocation).then(() => {
			dispatch(userSlice.actions.setLocation(defaultLocation));
			setIsLoading(false);
			setIsMapDisplay(false);
		}).catch(err => console.log(err));

	};

	const handleFind = async () => {
		setIsLoading(true);
		const newLocation = await geocode(defaultLocation.address);
		setDefaultLocation({ ...defaultLocation, location: newLocation });
		setIsLoading(false);
	};

	const findNewAddress = (index, value) => {
		let updatedAddress = '';
		let locationArray = defaultLocation.address.split(',');
		locationArray[index] = value;

		for (var i in locationArray) {
			if (i > 0) updatedAddress += ',';
			updatedAddress += locationArray[i];
		}

		return updatedAddress;
	};

	const handleInputChange = (e) => {
		const id = e.target.id;
		const value = e.target.value;
		let address = '';
		switch (id) {
			case 'map-street':
				address = findNewAddress(0, value);
				setDefaultLocation({
					...defaultLocation,
					address: address,
					street: value,
				});
				return;
			case 'map-ward':
				address = findNewAddress(1, value);
				setDefaultLocation({
					...defaultLocation,
					address: address,
					ward: value,
				});
				return;
			case 'map-district':
				address = findNewAddress(2, value);
				setDefaultLocation({
					...defaultLocation,
					address: address,
					district: value,
				});
				return;
			case 'map-province':
				address = findNewAddress(3, value);
				setDefaultLocation({
					...defaultLocation,
					address: address,
					province: value,
				});
				return;
			case 'map-country':
				address = findNewAddress(4, value);
				setDefaultLocation({
					...defaultLocation,
					address: address,
					country: value,
				});
				return;
			default:
				return;
		}
	};

	if (!isMapDisplay) return;

	return (
		<div
			id='children'
			className='map-popup-container'
			onClick={(e) => closePopupWithEvent(e)}>
			<div className='box box-map'>
				<Map
					defaultLocation={defaultLocation}
					setDefaultLocation={setDefaultLocation}
					setIsLoading={setIsLoading}
				/>
				<div className='bx4'>
					<h2>SELECT LOCATION</h2>
					<input
						id='map-street'
						type='text'
						value={defaultLocation.street}
						placeholder='Number and Street'
						onChange={(e) => handleInputChange(e)}
					/>
					<input
						id='map-ward'
						type='text'
						value={defaultLocation.ward}
						placeholder='Ward'
						onChange={(e) => handleInputChange(e)}
					/>
					<input
						id='map-district'
						type='text'
						value={defaultLocation.district}
						placeholder='District'
						onChange={(e) => handleInputChange(e)}
					/>
					<input
						id='map-province'
						type='text'
						value={defaultLocation.province}
						placeholder='City'
						onChange={(e) => handleInputChange(e)}
					/>
					<input
						id='map-country'
						type='text'
						value={defaultLocation.country}
						placeholder='Country'
						onChange={(e) => handleInputChange(e)}
					/>
					<button onClick={() => handleFind()}>FIND</button>
					<button onClick={() => handleAccept()}>ACCEPT</button>
					{function () {
						if (isLoading)
							return (
								<div
									className='login-loading'
									style={{ marginTop: '10px' }}></div>
							);
					}.call(this)}
				</div>
			</div>
		</div>
	);
}

export default MapPopup;
