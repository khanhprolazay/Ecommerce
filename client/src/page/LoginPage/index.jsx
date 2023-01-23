import Carousel from 'react-grid-carousel';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function LoginPage(props) {
    const [isSignup, setIsSignUp] = useState(false);

    return (
        <div className={{marginTop: '25px' }}>
            <section>
                <div className='container-1139'>
                    <h1 className='logo'>LOGO</h1>
                </div>
            </section>
            <div className='loginform'>
                <div className='container-1139 loginform-container'>
                    <Carousel
                        hideArrow={true}
                        cols={1}
                        rows={1}
                        containerStyle={{ maxWidth: '40.65%' }}
                        loop
                        autoplay={3000}
                    >
                        <Carousel.Item>
                            <img
                                src={require('../../assets/img/hero-image.png').default}
                                alt='login'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src={require('../../assets/img/img1.jpg').default}
                                alt='login'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src={require('../../assets/img/img2.jpg').default}
                                alt='login'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src={require('../../assets/img/img3.jpg').default}
                                alt='login'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src={require('../../assets/img/img4.jpg').default}
                                alt='login'
                            />
                        </Carousel.Item>
                    </Carousel>
                    {function () {
                        if (isSignup)
                            return <SignUpForm setIsSignUp={setIsSignUp} setUser={props.setUser} />;
                        return <LoginForm setIsSignUp={setIsSignUp} />;
                    }.call(this)}
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
