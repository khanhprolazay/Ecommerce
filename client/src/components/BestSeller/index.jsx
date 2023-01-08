import Carousel from 'react-grid-carousel';
import '../../assets/css/BestSeller.css';
import BestSellerItem from './Item';
import { useId, useState, useEffect } from 'react';
import axios from 'axios';

function BestSeller() {
    const id = useId();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items/hot/10/0')
            .then((data) => setItems(data.data))
    }, [])

    return (
        <section className='bestseller'>
            <div className='container-1139 bestseller-container'>
                <div className='container-1139 bestseller-content-container'>
                    <h2 className='bestseller-heading'>Best Seller Product</h2>
                    <p className='bestseller-desc'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ullamcorper congue eros
                    </p>
                    <button className='button seemore-button'>SEE MORE</button>
                </div>

                <Carousel
                    cols={2}
                    loop
                    showDots={true}
                    hideArrow={true}
                    containerStyle={{ maxWidth: '70.952%' }}
                    gap={14.7}
                >
                    {items.map((item) => (
                        <Carousel.Item key={id}>
                            <BestSellerItem
                                item={item.doc}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
export default BestSeller;
