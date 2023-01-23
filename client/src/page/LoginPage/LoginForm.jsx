import '../../assets/css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../redux/slice/UserSlice';
import { itemsSlice } from '../../redux/slice/ItemsSlice';
import { requestApi } from '../../utils';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState({ state: 'init', message: '' });
    const setIsSignUp = props.setIsSignUp;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkLogin = async (e) => {
        e.preventDefault();
        setState({ ...state, state: 'loading', message: '' });
        axios.post('http://localhost:5500/login', { username: username, password: password })
            .then((data) => {
                // if username and password are correct, get user information 
                //and all items of user. Then, store them in redux
                if (data.status === 200) {
                    data = data.data;
                    // Store user
                    dispatch(userSlice.actions.set(data.user));

                    //Store authenToken and refreshToken
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);

                    //Store user items
                    requestApi(`http://localhost:5000/carts/${username}`, {}, {}, 'get')
                        .then((data) => {
                            setState({ ...state, state: 'init', message: '' });
                            dispatch(itemsSlice.actions.setUserItems(data.data));
                            navigate('/');
                        })
                }
            })
            .catch((err) => setState({ ...state, state: 'error', message: err.response.data }));
    };

    const onChangeUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
    };

    const onChangePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

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
            {function () {
                if (state.state === 'loading')
                    return <div className='container-1139' style={{ justifyContent: 'space-evenly' }}>
                        <div className='login-loading'></div>
                    </div>
                return <div>
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
                    >
                        <img
                            src={require('../../assets/img/facebook.png').default}
                            alt='logo'
                        />
                        <img
                            src={require('../../assets/img/google.png').default}
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
                    </div></div>
            }.call(this)}
            <div className='login-message'>{state.message}</div>
        </div>
    );
}
export default LoginForm;
