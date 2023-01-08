import '../assets/css/HeadingCategory.css';

function HeadingCategory() {
    return (
        <section>
            <div
                className='container-1056 container-padding'
                style={{
                    backgroundColor: 'white',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}
            >
                <div
                    style={{
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '24px',
                        letterSpacing: '0.115em',
                        width: '61.017%',
                    }}
                >
                    Sản phẩm
                </div>
                <div
                    className='idItem'
                    style={{ width: '14.802%' }}
                >
                    Đơn giá
                </div>
                <div
                    className='idItem'
                    style={{ width: '12.203%' }}
                >
                    Số lượng
                </div>
                <div
                    className='idItem'
                    style={{ width: '11.977%', textAlign: 'end' }}
                >
                    Thành tiền
                </div>
            </div>
        </section>
    );
}
export default HeadingCategory;
