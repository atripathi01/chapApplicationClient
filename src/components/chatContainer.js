import React, { useEffect, useRef, useState } from 'react';
import Ava from '../images/ava1.jpg';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
import axios from 'axios';

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [typedMsg, setTypedMsg] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(undefined);
  const scrollRef = useRef();

  useEffect(() => {
    async function fetchChat() {
      const data = await JSON.parse(localStorage.getItem('userDetail'));
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messages/getmessage`,
        {
          from: data._id,
          to: currentChat._id,
        }
      );

      setMessages(response?.data?.msgs);
    }
    fetchChat();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem('userDetail'))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMessage = async () => {
    console.log('sendMessage', typedMsg);
    const data = await JSON.parse(localStorage.getItem('userDetail'));
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: data._id,
      msg: typedMsg,
    });
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/messages/addmessage`,
      {
        from: data._id,
        to: currentChat._id,
        message: typedMsg,
      }
    );
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: typedMsg });
    setMessages(msgs);
    setTypedMsg('');
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <div style={{width:"100%", position:"relative"}}>
      <div className='chat_header'>
        <div className='chat_header_left'>
          <div className='chat_contact_img'>
            <img className='img_ava' src={Ava} alt='contact_img' />
          </div>
          <p className='name_h'>{currentChat?.username}</p>
          <p className='mp' style={{ color: 'green' }}>
            Online
          </p>
        </div>
      </div>
      <div className='chat_divider'></div>
      <div className='chat_body'>
        <div className='chatBox' >
        {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()} className='message_bos'>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className='content '>
                  <p className='message_sendandrecieve'><span style={{fontSize:"12px"}}>{message.fromSelf ? "YOU":currentChat?.username.toUpperCase()}</span>: {message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
       
        <div className='messgeType'>
          <textarea
            type='text'
            className='chat_input'
            value={typedMsg}
            onKeyDown={handleKeyDown}
            placeholder='Type a message'
            onChange={(e) => setTypedMsg(e.target.value)}
          />
          <button className='chat_butn' onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
