import React from 'react';
import '../assets/css/Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='container-1056 footer-container'>
                <ul className='footer-category'>
                    <li className='footer-category-item'>MEN</li>
                    <li className='footer-category-item'>WOMEN</li>
                    <li className='footer-category-item'>KIDS</li>
                    <li className='footer-category-item'>TRENS</li>
                    <li className='footer-category-item'>CONTACTS US</li>
                    <li className='footer-category-item'>FAQ</li>
                </ul>
            </div>
            <p className='footer-rightlaw'>© 2021 FIFAH. All Right Reserved</p>
        </footer>
    );
}
export default React.memo(Footer, () => true);
