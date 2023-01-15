import Header from '../components/Header';
import Logo from '../components/Logo';
import Address from '../components/Address';
import HeadingCategory from '../components/HeadingCategory';
import PurchasedItem from '../components/PurchasedItem';
import PurchasedTotal from '../components/PurchasedTotal';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { getItemsInCart, getUser } from '../redux/selectors';


function PurchasedPage() {
    const user = useSelector(getUser);
    const itemsInCart = useSelector(getItemsInCart);


    return (
        <div style={{ backgroundColor: 'var(--gray-color)' }}>
            <Header user={user} />
            <Logo location='Thanh toán' />
            <Address user={user} />
            <HeadingCategory />
            <section>
                {itemsInCart.map(item => { return <PurchasedItem item={item} />;})}
            </section>
            <PurchasedTotal itemsInCart={itemsInCart} />
            <Footer />
        </div>
    );
}
export default PurchasedPage;
