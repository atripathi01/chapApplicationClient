import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../images/Animation - 1717828210448.json';
import animationData2 from '../images/Animation - 1717827977193.json';
const Welcome = ({currentUser}) => {
  return (
    <div className='welcome_container'>
      <Lottie
        options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
        }}
      />
      <div style={{ width: '50px' }}>
        {' '}
        <Lottie
          options={{
            animationData: animationData2,
            loop: true,
            autoplay: true,
          }}
        />
      </div>

      <h1 style={{ fontSize: '50px', marginTop: 0 }}>Welcome,{currentUser?.username}</h1>
    </div>
  );
};

export default Welcome;
