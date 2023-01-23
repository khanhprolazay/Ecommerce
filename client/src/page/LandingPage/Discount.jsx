import Vecto from '../../components/Vecto';
import '../../assets/css/Discount.css';

function Discount() {
    const vecto = { bottom: '18%', right: '1%' };
    return (
        <div className='container-1139 layout discount'>
            <div className='container-1139 discount-content-container'>
                <h3 className='discount-heading'>Deal of The Day</h3>
                <p className='discount-desc'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    ullamcorper congue erosget tincidunt{' '}
                </p>
                <div className='container-1139 date-container'>
                    <div className='container-1139 time-container'>
                        <p className='discount-number'>08</p>
                        <p className='discount-text'>Days</p>
                    </div>
                    <div className='container-1139 time-container'>
                        <p className='discount-number'>09</p>
                        <p className='discount-text'>Hours</p>
                    </div>
                    <div className='container-1139 time-container'>
                        <p className='discount-number'>14</p>
                        <p className='discount-text'>Mins</p>
                    </div>
                </div>
                <div className='button discount-button'>SHOP NOW</div>
            </div>
            <img
                src={'https://cf.shopee.vn/file/48cd247a25c39ae14cc12ae4311a6462'}
                alt='discount-img'
            />
            <div className='decorate-underitem rectancle-3'></div>
            <Vecto style={vecto} />
        </div>
    );
}
export default Discount;
