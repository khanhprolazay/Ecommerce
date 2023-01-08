import '../assets/css/LoginForm.css';
import { useState } from 'react';
import axios from 'axios';

function SignUpForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const setIsSignUp = props.setIsSignUp;

    const checkSignUp = () => {
        axios.post('http://localhost:5500/signup', {
            username: username,
            password: password,
            repassword: repassword,
        }).then((data) => {
            if (data.status === 200)  setIsSignUp(false);
        }).catch((err) => console.log(err));
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeRepassword = (e) => {
        setRepassword(e.target.value);
    }

    return (
        <form className='container-1139-item fillup'>
            <h2 className='heading-login'>ĐĂNG KÝ</h2>
            <input
                className='login-input'
                type='text'
                value={username}
                onChange={onChangeUsername}
                placeholder='Tên đăng nhập'
                required
            />
            <input
                className='login-input'
                type='password'
                value={password}
                onChange={onChangePassword}
                placeholder='Mật khẩu'
                required
            />
            <input
                className='login-input'
                type='password'
                value={repassword}
                onChange={onChangeRepassword}
                placeholder='Nhập lại mật khẩu'
                required
            />
            <button
                className='button bt_login'
                type='button'
                onClick={checkSignUp}
            >
                ĐĂNG KÝ
            </button>
            <div className='container-1139 signup'>
                <p className='signup-content'>Đã có tài khoản?</p>
                <p
                    className='signup-content --heavy'
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsSignUp(false)}
                >
                    Đăng nhập
                </p>
            </div>
        </form>
    );
}
export default SignUpForm;
