import '../assets/css/Address.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Address(props) {
    const user = props.user;

    return (
        <section style={{ marginTop: '26px', marginBottom: '26px' }}>
            <div className='container-1056 container-padding location'>
                <div className='username-number'>{user.username} (+84) {user.number}</div>
                <div className='address'>
                    Số 1, Đường Võ Văn Ngân, Phường Linh Trung, Thành phố Thủ Đức
                </div>
                <a href='./top'>
                    <div className='change'>Thay Đổi</div>
                </a>
                <div className='container-item address-heading'>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{
                            color: 'var(--heavyblue-color)',
                            fontSize: '25px',
                        }}
                    />
                    <div className='adrress-heading-content'>
                        Địa Chỉ Nhận Hàng
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Address;
