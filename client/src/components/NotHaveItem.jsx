import '../assets/css/NotHaveItem.css'

function NotHaveItem() {
    return(
        <div className='not-item-container'>
            <img src={require('../assets/img/chua_co_don_hang.png').default} alt="not-have-item"/>
            <div className='not-item-desc'>Chưa có đơn hàng</div>
        </div>
    )
}
export default NotHaveItem