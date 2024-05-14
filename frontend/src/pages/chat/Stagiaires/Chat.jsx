import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { icons, images } from '../../../constants';
import UserLayout from '../../../layouts/UserLayout';
import axios from 'axios';

const ChatStg = () => {

  const [chatId, setChatId] = useState('6640f2bccab400624d11ff3c')
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState([]);
  const [Responsable, setResponsable] = useState([]);
  const [User, setUser] = useState([]);
  const storedData = localStorage.getItem("sessionToken");
  let storedId;

  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suivi/show/${chatId}`);
        setMessages(response.data.chat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/responsable/show/${storedId[1]}`);
        setResponsable(response.data);
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
        setUser(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMsg = async(e) => {
    e.preventDefault();
    const newMessage = {
      id_utilisateur: storedId[1],
      message: newMsg,
    };
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/suivi/send/${chatId}`, newMessage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    setMessages([...messages, newMessage]);
    setNewMsg('');
  };

  const handleMsgDelete = async(e, id) => {
    e.preventDefault();
    const data={
      id:chatId
    }
    try {
      await axios.put(`http://127.0.0.1:8000/api/suivi/deleteChatMessage/${id}`,data);

      console.log('Chat message deleted successfully');
    } catch (error) {
      console.error('Error deleting chat message:', error.message);
    }
  };



  //todo : for seesion responsable show all stgs
  return (
    <UserLayout>
      <div className='p-10 w-full h-full flex items-center gap-10'>
        <div className="users rounded-xl border h-full border-[#999999] w-1/3 flex flex-col overflow-y-scroll">

          <div className="user">
<<<<<<< HEAD
            
=======

>>>>>>> e2060cf18f66ab7cf9e0bc1315777f8bbcc3b845
              <a href="#" className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
                <img src={`images_cv/${User.img_url}`} className='size-20 size-20 rounded-full' alt="" />
                <div>
                  <p className='text-lg font-medium'>{Responsable.nom}</p>
                  <p className='text-lg font-light'>{Responsable.email}</p>
                </div>
              </a>
<<<<<<< HEAD
          
=======

>>>>>>> e2060cf18f66ab7cf9e0bc1315777f8bbcc3b845
            </div>

        </div>
        <div className='chatbox w-2/3 h-full flex flex-col gap-5'>
          <div className="chat h-[90%] border border-[#999999] rounded-t-xl">
            <div className="user h-[25%] p-3 border-b-[0.5px]">
              <a href="#" className='flex items-center gap-5'>
                <img src={`images_cv/${User.img_url}`} className='size-20 rounded-full' alt="" />
                <div>
                  <p className='text-lg font-medium'>{Responsable.nom}</p>
                  <p className='text-lg font-light'>{Responsable.email}</p>
                </div>
              </a>
            </div>
            <div className="messages h-[75%] overflow-y-scroll w-full p-3 flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${msg.id_utilisateur === storedId[1]
                    ? "flex justify-end mb-4"
                    : "flex justify-start mb-4"
                    } text-2xl py-3 px-4 w-full`}
                >
                  <div className={`${msg.id_utilisateur === storedId[1]
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    } text-2xl py-3 px-4 rounded-xl shadow-md flex items-center gap-2 w-fit`}>
                    <div className='flex flex-col gap-2'>
                      <span className="text-2xl font-medium">{msg.message}</span>
                      <span className="text-xl font-light">
                        {moment(msg.created_at).fromNow()}
                      </span>
                    </div>
                    {msg.id_utilisateur === storedId[1] && (
                    <form onSubmit={(e)=>handleMsgDelete(e,msg._id)}>
                      <button type='submit'>
                        <img src={icons.Delete} alt="" />
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
              <input type="text" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="w-[90%] outline-none h-full rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-lg text-black pl-2" />
              <button className="p-3 w-[10%] text-white bg-black rounded-xl">Send</button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatStg;