import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import animationData2 from '../images/Animation - 1717827977193.json';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [registerData, setRegisterdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterdata({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, registerData)
      .then((response) => {
        toast.success(response?.data?.message || 'Register Successful', {
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
          navigate('/login');
          setIsLoading(false);
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
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
      <h1>Register</h1>
      <div className='box_login'>
        <form className='loginForm' onChange={handleChange}>
          <input
            type='text'
            placeholder='Name'
            name='name'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={handleChange}
          />
          <button className='button' onClick={handleSubmit}>
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
              'Register'
            )}
          </button>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
