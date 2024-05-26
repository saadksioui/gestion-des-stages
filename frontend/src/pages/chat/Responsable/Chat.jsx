import React, { useEffect, useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { icons } from '../../../constants';
import UserLayout from '../../../layouts/UserLayout';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const ChatR = () => {
  const [chatId, setChatId] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [responsable, setResponsable] = useState({});
  const [users, setUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const messageEndRef = useRef(null);

  const storedData = localStorage.getItem("sessionToken");
  let storedId;
  let initialProfile = '';

  try {
    if (storedData) {
      storedId = storedData.split(",");
      initialProfile = storedId[1];
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/responsable/getResponsableById/${storedId[1]}`);
        setResponsable(response.data);
        setUserIds(response.data.ids_stg);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await Promise.all(userIds.map(async (userId) => {
          const response = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${userId}`);
          return response.data;
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userIds.length > 0) {
      fetchUsers();
    }
  }, [userIds]);

  const showChat = useCallback(async (id) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/suivi/get_etud', {
        params: {
          id_étudiant: id
        }
      });

      if (response.data && response.data.chat) {
        setMessages(response.data.chat);
        setChatId(response.data._id);
      } else {
        setMessages([]);
        setChatId('');
        console.error('Chat data not found:', response.data);
      }

      const userResponse = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${id}`);
      setSelectedUser(userResponse.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error.message);
    }
  }, [newMsg]);

  const fetchMessages = useCallback(async () => {
    if (selectedUser && chatId) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/suivi/get_etud', {
          params: {
            id_étudiant: selectedUser._id
          }
        });
        if (response.data && response.data.chat) {
          setMessages(response.data.chat);
        }
      } catch (error) {
        console.error('Error refreshing chat messages:', error);
      }
    }
  }, [selectedUser, chatId]);

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

      socket.emit('sendMessage', { chatId, message: response.data });
      setNewMsg('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMsgDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/suivi/deleteChatMessage/${id}`, { id: chatId });
      socket.emit('deleteMessage', { chatId, messageId: id });
      console.log('Chat message deleted successfully');
    } catch (error) {
      console.error('Error deleting chat message:', error.message);
    }
  };
  

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

  return (
    <UserLayout>
      <div className='p-10 w-full h-full flex items-center gap-10'>
        <div className="users rounded-xl border h-full border-[#999999] w-1/3 flex flex-col overflow-y-scroll">
          {users.map((user, i) => (
            <button key={i} onClick={() => showChat(user._id)}>
              <div className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
                <img src={`images_cv/${user.img_url}`} className='size-20 rounded-full' alt={user.nom} />
                <div className='text-start'>
                  <p className='text-lg font-medium'>{user.nom}</p>
                  <p className='text-lg font-light'>{user.email}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className='chatbox w-2/3 h-full flex flex-col gap-5'>
          <div className="chat h-[90%] border border-[#999999] rounded-t-xl">
            <div className="user h-[25%] p-3 border-b-[0.5px] flex items-center gap-5">
              {selectedUser && (
                <>
                  <img src={`images_cv/${selectedUser.img_url}`} className='size-20 rounded-full' alt={selectedUser.nom} />
                  <div>
                    <p className='text-lg font-medium'>{selectedUser.nom}</p>
                    <p className='text-lg font-light'>{selectedUser.email}</p>
                  </div>
                </>
              )}
            </div>
            <div className="messages h-[75%] overflow-y-scroll w-full p-3 flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  ref={index === messages.length - 1 ? messageEndRef : null}
                  className={`${msg.id_utilisateur === storedId[1] ? "flex justify-end mb-4" : "flex justify-start mb-4"} text-2xl py-3 px-4 w-full`}
                >
                  <div className={`${msg.id_utilisateur === storedId[1] ? "bg-black text-white" : "bg-white text-black"} text-2xl py-3 px-4 rounded-xl shadow-md flex items-center gap-2 w-fit`}>
                    <div className='flex flex-col gap-2'>
                      <span className="text-2xl font-medium">{msg.message}</span>
                      <span className="text-xl font-light">{moment(msg.created_at).fromNow()}</span>
                    </div>
                    {msg.id_utilisateur === storedId[1] && (
                      <form onSubmit={(e) => handleMsgDelete(e, msg._id)}>
                        <button type='submit'>
                          <img src={icons.Delete} alt="Delete icon" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="input w-full h-[10%]">
            <form onSubmit={handleMsg} className='w-full h-full flex justify-between gap-5 items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]'>
              <input type="text" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="w-[90%] outline-none h-full rounded-xl bg-[#F6F6F6] placeholder:text-[#999999]" placeholder="Type your message here..." />
              <button type="submit" className="text-white bg-black p-3 rounded-xl">Send</button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatR;
