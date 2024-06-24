import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import animationData2 from '../images/Animation - 1717827977193.json';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';

const Login = () => {
  const [logindata, setLogindata] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogindata({ ...logindata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, logindata)
      .then((response) => {
        localStorage.setItem(
          'userDetail',
          JSON.stringify(response?.data?.user)
        );
        toast.success(response?.data?.message || 'Login Successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        setTimeout(() => {
          navigate('/chat');
          setIsLoading(false);
        }, 5000);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.response?.data?.msg || 'Something went wrong', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };
  return (
    <div className='App'>
      <ToastContainer />
      <h1>Login</h1>
      <div className='box_login'>
        <form className='loginForm'>
          <input
            type='text'
            placeholder='Username or Email'
            name='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <p className='forgotPassword'> Forgot Password?</p>
          <button
            className='button'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={{ width: '70px', overflow: 'hidden' }}>
                {' '}
                <Lottie
                  options={{
                    animationData: animationData2,
                    loop: true,
                    autoplay: true,
                  }}
                />
              </div>
            ) : (
              'Login'
            )}
          </button>
          <p>
            Dont have an account? <Link to='/register'>register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
