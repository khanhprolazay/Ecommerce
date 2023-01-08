import Carousel from 'react-grid-carousel';
import OurProductItem from './Item';
import Pagnition from '../Pagnition';
import '../../assets/css/OurProduct.css';
import { useState, useId, useEffect } from 'react';
import axios from 'axios';

function OurProduct() {
    const id = useId();
    const [items, setItems] = useState([]);
    const [pag, setPag] = useState({ start: 0, step: 60, tab: 'hot'});

    useEffect(() => {
        axios.get(`http://localhost:5000/items/${pag.tab}/${pag.step}/${pag.start}`)
            .then((data) => setItems(data.data))
    }, [pag])

    function changeTab(tab) {
        setPag({...pag, start: 0, tab: tab});
    }

    return (
        <section>
            <div className='container-1139 ourproduct-container'>
                <h2 className='ourpoduct-heading'>Our Product</h2>
                <div className='container-1139 category-container'>
                    <span
                        className={pag.tab === 'hot' ? 'ourproduct-category-item selecteditem' : 'ourproduct-category-item'}
                        onClick={() => changeTab('hot')}
                    >
                        HOT
                    </span>
                    <span
                        className={
                            pag.tab === 'sale' ? 'ourproduct-category-item selecteditem' : 'ourproduct-category-item'
                        }
                        onClick={() => changeTab('sale')}
                    >
                        ON SALE
                    </span>
                    <span
                        className={pag.tab === 'new' ? 'ourproduct-category-item selecteditem' : 'ourproduct-category-item'}
                        onClick={() => changeTab('new')}
                    >
                        NEW ARRIVAL
                    </span>
                </div>
                <Carousel
                    rows={15}
                    cols={4}
                    hideArrow={true}
                >
                    {items.map((item) => (
                        <Carousel.Item key={id}>
                            <OurProductItem
                                item={item.doc}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Pagnition pag={pag} setPag={setPag} />
            </div>
        </section>
    );
}
export default OurProduct;
