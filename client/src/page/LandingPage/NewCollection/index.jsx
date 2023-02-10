import Vecto from '../../../components/Vecto';
import '../../../assets/css/NewCollection.css';
import NewCollectionItem from './Item';
import Carousel from 'react-grid-carousel';
import { useId, useEffect, useState } from 'react';
import productApi from '../../../api/ProductApi';

function NewCollection() {
	const vecto = { top: '90%', left: '102%' };
	const id = useId();
	const [items, setItems] = useState([]);

	useEffect(() => {
		productApi
			.getProducts('new', 3, 0)
			.then((response) => setItems(response))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='container-1139 newcollection-container'>
			<div className='heading'>New Collection</div>
			<p className='desc'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper
				congue eros
			</p>
			<Carousel
				cols={3}
				loop
				hideArrow={true}>
				{items.map((item) => (
					<Carousel.Item key={id}>
						<NewCollectionItem item={item.doc} />
					</Carousel.Item>
				))}
			</Carousel>
			<Vecto style={vecto} />
			<div className='decorate-1'></div>
		</div>
	);
}
export default NewCollection;
