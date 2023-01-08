import '../assets/css/Document.css';

function Document() {
    return (
        <div className='document'>
            <div className='document-heading'>Hồ Sơ Của Tôi</div>
            <div className='document-desc'>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
            </div>
            <form className='document-form'>
                <div className='dghdd9'>
                    <div className='h4eiAQ'>
                        <div className='tBgRZR'>
                            <label>Tên đăng nhập</label>
                        </div>
                        <div className='gVdPk'>
                            <div className='Z1Wx1m'>khanhprolazay</div>
                        </div>
                    </div>
                </div>

                <div className='dghdd9'>
                    <div className='h4eiAQ'>
                        <div className='tBgRZR'>
                            <label>Tên</label>
                        </div>
                        <div className='gVdPk'>
                            <div className='ovqcxY'>
                                <input
                                    type='text'
                                    placeholder
                                    className='y-NK4C'
                                    value='Lê Minh'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Document;
