import '../assets/css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userSlice } from '../redux/slice/UserSlice';
import { itemsSlice } from '../redux/slice/ItemsSlice';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setIsSignUp = props.setIsSignUp;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkLogin = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5500/login', {
                username: username,
                password: password,
            })
            .then((result) => {
                return (result.data !== '' && result.data !== null) ? [true, result.data] : [false, result.data];
            })
            .then((data) => {
                const isLogin = data[0];
                const dataFromServer = data[1];
                const getDataFromApi = async (isLogin, dataFromServer) => {
                    const userInfor = dataFromServer.userInfor;

                    // if username and password are correct, get user information 
                    //and all items of user. Then, store them in redux
                    if (isLogin) {
                        console.log(dataFromServer);
                        // Storage user
                        dispatch(userSlice.actions.set(userInfor));

                        //Stora authenToken and refreshToken
                        localStorage.setItem('accessToken', dataFromServer.accessToken);
                        localStorage.setItem('refreshToken', dataFromServer.refreshToken);


                        //Get all items of user and store
                        const requestConfig = {headers: {authorization: "Bear " + dataFromServer.accessToken}}
                        const items = await axios
                            .get(`http://localhost:5000/carts/${userInfor.username}`, requestConfig)
                            .then((data) => { return data.data })
                        dispatch(itemsSlice.actions.setUserItems(items));

                        //Go to LandingPage
                        navigate('/');
                    }
                }
                getDataFromApi(isLogin, dataFromServer);
            })
            .catch((err) => { });
    };

    const onChangeUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
    }

    const onChangePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    return (
        <div
            className='container-1139-item fillup'
        >
            <h2 className='heading-login'>ĐĂNG NHẬP</h2>
            <input
                className='login-input'
                id='tb_loginName'
                type='text'
                name='username'
                placeholder='Tên đăng nhập'
                onChange={onChangeUsername}
                required
            />
            <input
                className='login-input'
                id='tb_password'
                type='password'
                name='password'
                placeholder='Mật khẩu'
                onChange={onChangePassword}
                required
            />
            <button
                className='button bt_login'
                id='bt_login'
                type='button'
                onClick={checkLogin}
            >
                ĐĂNG NHẬP
            </button>
            <a
                href='top'
                className='forget-content'
            >
                Quên mật khẩu?
            </a>
            <div className='container-item or'>
                <div className='horizontal-line'></div>
                <p className='or-content'>HOẶC</p>
                <div className='horizontal-line'></div>
            </div>
            <div
                className='container-1139 login-logo-container'
                style={{}}
            >
                <img
                    src={require('../assets/img/facebook.png').default}
                    alt='logo'
                />
                <img
                    src={require('../assets/img/google.png').default}
                    alt='logo'
                />
            </div>
            <div className='container-1139 signup'>
                <p className='signup-content'>Bạn chưa có tài khoản?</p>
                <p
                    className='signup-content --heavy'
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsSignUp(true)}
                >
                    Đăng ký
                </p>
            </div>
        </div>
    );
}
export default LoginForm;
