import React, { useEffect, useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { icons } from '../../../constants';
import UserLayout from '../../../layouts/UserLayout';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');  // Adjust this URL to match your server's URL

const ChatStg = () => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [responsable, setResponsable] = useState({});
  const [chat, setChat] = useState({});
  const [chatId, setChatId] = useState();
  const [responsableID, setResponsableID] = useState();
  const [user, setUser] = useState({});
  const messageEndRef = useRef(null);

  const storedData = localStorage.getItem('sessionToken');
  let storedId = storedData ? storedData.split(',') : [];

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/suivi/get_etud', {
        params: {
          id_étudiant: storedId[1],
        },
      });
      setMessages(response.data.chat);
      setChat(response.data);
      setChatId(response.data._id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [storedId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, newMsg]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsableIdResponse = await axios.get(`http://127.0.0.1:8000/api/responsable/show/${storedId[1]}`);
        setResponsableID(responsableIdResponse.data._id);
        const responsableResponse = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${responsableIdResponse.data._id}`);
        setResponsable(responsableResponse.data);
        const userResponse = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (storedId[1]) {
      fetchData();
    }
  }, [storedId]);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      if (data.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });

    socket.on('messageDeleted', (data) => {
      if (data.chatId === chatId) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== data.messageId));
      }
    });

    return () => {
      socket.off('newMessage');
      socket.off('messageDeleted');
    };
  }, [chatId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleMsg = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/suivi/send/${chatId}`, {
        id_utilisateur: storedId[1],
        message: newMsg,
      });
      setNewMsg('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMsgDelete = async (e, id) => {
    e.preventDefault();
    if (!id) {
      console.error('Message ID is undefined');
      return;
    }
    try {
      await axios.put(`http://127.0.0.1:8000/api/suivi/deleteChatMessage/${id}`, { id: chatId });
      socket.emit('deleteMessage', { chatId, messageId: id });
      console.log('Chat message deleted successfully');
    } catch (error) {
      console.error('Error deleting chat message:', error.message);
    }
  };

  return (
    <UserLayout>
      <div className='p-10 w-full h-full flex items-center gap-10'>
        <div className='chatbox w-full h-full flex flex-col gap-5'>
          <div className='chat h-[90%] border border-[#999999] rounded-t-xl'>
            <div className='user h-[17%] p-3 border-b-[0.5px]'>
              <a href='#' className='flex items-center gap-5'>
                <img src={`images_cv/${responsable.img_url}`} className='size-20 rounded-full' alt='' />
                <div>
                  <p className='text-lg font-medium'>{responsable.nom}</p>
                  <p className='text-lg font-light'>{responsable.email}</p>
                </div>
              </a>
            </div>
            <div className='messages h-[83%] overflow-y-scroll w-full p-3 flex flex-col gap-3'>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  ref={index === messages.length - 1 ? messageEndRef : null}
                  className={`${msg.id_utilisateur === storedId[1] ? 'flex justify-end mb-4' : 'flex justify-start mb-4'} text-2xl py-3 px-4 w-full`}
                >
                  <div
                    className={`${msg.id_utilisateur === storedId[1] ? 'bg-black text-white' : 'bg-white text-black'} text-2xl py-3 px-4 rounded-xl shadow-md flex items-center gap-2 w-fit`}
                  >
                    <div className='flex flex-col gap-2'>
                      <span className='text-2xl font-medium'>{msg.message}</span>
                      <span className='text-xl font-light'>{moment(msg.created_at).fromNow()}</span>
                    </div>
                    {msg.id_utilisateur === storedId[1] && (
                      <form onSubmit={(e) => handleMsgDelete(e, msg._id)}>
                        <button type='submit'>
                          <img src={icons.Delete} alt='Delete icon' />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='input w-full h-[10%]'>
            <form onSubmit={handleMsg} className='w-full h-full flex justify-between items-center pl-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]'>
              <input
                type='text'
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className='w-[90%] outline-none h-full rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-lg text-black pl-2'
                placeholder='Type your message here...'
              />
              <button type='submit' className='p-3 w-fit text-white bg-black rounded-xl'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatStg;
