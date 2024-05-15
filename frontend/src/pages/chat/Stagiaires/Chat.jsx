import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { icons } from '../../../constants';
import UserLayout from '../../../layouts/UserLayout';
import axios from 'axios';

const ChatStg = () => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [responsable, setResponsable] = useState({});

  const [chat, setchat] = useState({});
  const [chatId, setChatId] = useState();
  const [responsableID, setResponsableID] = useState();
  const [user, setUser] = useState({});
  const messageEndRef = useRef(null);

  const storedData = localStorage.getItem('sessionToken');

  let storedId = storedData.split(',');


  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/suivi/get_etud', {
          params: {
            id_étudiant: storedId[1]
          }
        });
        setMessages(response.data.chat);
        setchat(response.data);
        setChatId(response.data._id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMessages();
  }, [messages]);
  // Fetch responsable and user data
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
    fetchData();
  }, []);

  // Scroll to the newest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleMsg = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/suivi/send/${chatId}`, {
          id_utilisateur: storedId[1],
          message: newMsg,
      });

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMsg('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMsgDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/suivi/deleteChatMessage/${id}`,  { id:chatId } );
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
      console.log('Chat message deleted successfully');
    } catch (error) {
      console.error('Error deleting chat message:', error.message);
    }
  };

  return (
    <UserLayout>
      <div className='p-10 w-full h-full flex items-center gap-10'>
        <div className='users rounded-xl border h-full border-[#999999] w-1/3 flex flex-col overflow-y-scroll'>
          <div className='user'>
            <a href='#' className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
              <img src={`images_cv/${responsable.img_url}`} className='size-20 rounded-full' alt='' />
              <div>
                <p className='text-lg font-medium'>{responsable.nom}</p>
                <p className='text-lg font-light'>{responsable.email}</p>
              </div>
            </a>
          </div>
        </div>
        <div className='chatbox w-2/3 h-full flex flex-col gap-5'>
          <div className='chat h-[90%] border border-[#999999] rounded-t-xl'>
            <div className='user h-[25%] p-3 border-b-[0.5px]'>
              <a href='#' className='flex items-center gap-5'>
                <img src={`images_cv/${responsable.img_url}`} className='size-20 rounded-full' alt='' />
                <div>
                  <p className='text-lg font-medium'>{responsable.nom}</p>
                  <p className='text-lg font-light'>{responsable.email}</p>
                </div>
              </a>
            </div>
            <div className='messages h-[75%] overflow-y-scroll w-full p-3 flex flex-col gap-3'>
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
            <form onSubmit={handleMsg} className='w-full h-full flex justify-between gap-5 items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]'>
              <input
                type='text'
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className='w-[90%] outline-none h-full rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-lg text-black pl-2'
                placeholder='Type your message here...'
              />
              <button type='submit' className='p-3 w-[10%] text-white bg-black rounded-xl'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatStg;
