import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import Ava from '../images/ava1.jpg';
import { Bounce, toast } from 'react-toastify';
import Welcome from './welcome';
import ChatContainer from './chatContainer';
import { useNavigate } from 'react-router-dom';


const Chat = () => {
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  //   const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);



  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userDetail')) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('userDetail')));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_BACKEND_URL);
      socket.current.emit('add-user', currentUser?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/alluser/${currentUser?._id}`
        )
        .then((response) => {
          console.log(response);
          setContact(response?.data?.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser]);
  const handleClick = (index, lis) => {
    setCurrentChat(lis);
    setCurrentSelected(index);
  };

  return (
    <div className='App'>
      <h1>Welcome to real time chat application</h1>
      <div className='box_Chat'>
        <div className='chat_contacts'>
          <div className='outer_con'>
            {contact?.map((lis, index) => {
              return (
                <div
                  className={`chat_contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={lis._id}
                  onClick={() => handleClick(index, lis)}
                >
                  <div className='chat_contact_img'>
                    <img className='img_ava' src={Ava} alt='contact_img' />
                  </div>
                  <div className='chat_contact_name'>
                    <p>{lis.username}</p>
                  </div>
                </div>
              );
            })}
            <div className='myProfile'>
              <div className='chat_contact_img'>
                <img className='img_ava' src={Ava} alt='contact_img' />
              </div>
              <div className='chat_contact_name'>
                <p className='mp'>
                  {currentUser?.username || 'Ayush Tripathi'}
                </p>
                <p className='mp' style={{ color: 'green' }}>
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
            <div>
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              contact={contact}
              socket={socket}
            />
          ) : (
            <Welcome currentUser={currentUser}/>
          )}
          </div>
        </div>
      </div>
    <div className='box_chat'>
        This is only of large screen, if you want to display you have to rotate your screen
    </div>
    </div>
  );
};

export default Chat;
