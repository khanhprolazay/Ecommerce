import Loading from './Loading';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { reverseGeocode } from '../utils';
import React from 'react';

function Map(props) {
	const defaultLocation = props.defaultLocation;
	const setDefaultLocation = props.setDefaultLocation;
	const setIsLoading = props.setIsLoading;
	
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
	});

	const onMarkerDragEnd = async (coord) => {
		setIsLoading(true);
		const { latLng } = coord;
		const lat = latLng.lat();
		const lng = latLng.lng();
		const position = { lat, lng };
    	const location = await reverseGeocode(position);
		setDefaultLocation(location);
		setIsLoading(false);
	};


	if (!isLoaded) return (<Loading />)

	return (
		<GoogleMap
			zoom={16}
			center={defaultLocation.location}
			mapContainerStyle={{ height: '100%', width: '100%' }}>
			<Marker
				position={defaultLocation.location}
				draggable={true}
				onDragEnd={(coord) => onMarkerDragEnd(coord)}
				name={defaultLocation.address}
			/>
		</GoogleMap>
	);
}

export default React.memo(Map, (prevState, nextState) => {
	const prevLocation = prevState.defaultLocation.location;	
	const nextLocation = nextState.defaultLocation.location;
	return !(prevLocation.lat !== nextLocation.lat && prevLocation.lng !== nextLocation.lng);
})
