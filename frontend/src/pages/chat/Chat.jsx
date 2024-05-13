import React, { useState } from 'react';
import moment from 'moment'
import { icons, images } from '../../constants';
import UserLayout from '../../layouts/UserLayout';

const Chat = () => {

  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState([
    {
      "id_utilisateur": "66401e144c2c4ce017a5ad2c",
      "created_at": "2024-05-12T16:42:27.648Z",
      "message": "First message",
      "_id": "612c5eaffa5d5e312c14e8c5"
    },
    {
      "id_utilisateur": "6640f198cab400624d11ff3a",
      "created_at": "2024-05-12T16:42:27.648Z",
      "message": "Second message",
      "_id": "612c5eaffa5d5e312c14e8c6"
    },
    {
      "id_utilisateur": "6640f198cab400624d11ff3a",
      "created_at": "2024-05-12T16:51:20.598Z",
      "message": "This is a new message.",
      "_id": "6640f388cab400624d11ff40"
    },
    {
      "id_utilisateur": "6640f198cab400624d11ff3a",
      "created_at": "2024-05-13T07:48:38.731Z",
      "message": "This is a new message  1.",
      "_id": "6641c5d67185099b839ff4f3"
    }
  ]);

  const handleMsg = (e) => {
    e.preventDefault();
    const newMessage = {
      id_utilisateur: "66401e144c2c4ce017a5ad2c",
      created_at: moment().format(),
      message: newMsg,
      _id: "6641c5d67185fsfds2339ff4f3"
    };
    setMessages([...messages, newMessage]);
    setNewMsg('');
  };

  const handleMsgDelete = (e, id) => {
    e.preventDefault();
    setMessages(messages.filter(m => m._id !== id));
  };



  return (
    <UserLayout>
      <div className='p-10 w-full h-full flex items-center gap-10'>
        <div className="users rounded-xl border h-full border-[#999999] w-1/3 flex flex-col overflow-y-scroll">
          <div className="user">
            <a href="#" className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
              <img src={images.Pfp1} className='size-20' alt="" />
              <div>
                <p className='text-lg font-medium'>John Doe</p>
                <p className='text-lg font-light'>johndoe@gmail.com</p>
              </div>
            </a>
          </div>
          <div className="user">
            <a href="#" className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
              <img src={images.Pfp1} className='size-20' alt="" />
              <div>
                <p className='text-lg font-medium'>John Doe</p>
                <p className='text-lg font-light'>johndoe@gmail.com</p>
              </div>
            </a>
          </div>
          <div className="user">
            <a href="#" className='flex items-center gap-5 border-b-[0.5px] border-[#999999] p-3'>
              <img src={images.Pfp3} className='size-20' alt="" />
              <div>
                <p className='text-lg font-medium'>Michael Brown</p>
                <p className='text-lg font-light'>michaelbrown@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
        <div className='chatbox w-2/3 h-full flex flex-col gap-5'>
          <div className="chat h-[90%] border border-[#999999] rounded-t-xl">
            <div className="user min-h-[15%] max-h-fit p-3 border-b-[0.5px]">
              <a href="#" className='flex items-center gap-5'>
                <img src={images.Pfp1} className='size-20' alt="" />
                <div>
                  <p className='text-lg font-medium'>John Doe</p>
                  <p className='text-lg font-light'>johndoe@gmail.com</p>
                </div>
              </a>
            </div>
            <div class="messages h-[85%] overflow-y-scroll w-full p-3 flex flex-col gap-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${msg.id_utilisateur === "66401e144c2c4ce017a5ad2c"
                    ? "flex justify-end mb-4"
                    : "flex justify-start mb-4"
                    } text-2xl py-3 px-4 w-full`}
                >
                  <div className={`${msg.id_utilisateur === "66401e144c2c4ce017a5ad2c"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    } text-2xl py-3 px-4 rounded-xl shadow-md flex items-center gap-2 w-fit`}>
                    <div className='flex flex-col gap-2'>
                      <span className="text-2xl font-medium">{msg.message}</span>
                      <span className="text-xl font-light">
                        {moment(msg.created_at).fromNow()}
                      </span>
                    </div>
                    <form onSubmit={()=>handleMsgDelete(msg._id)}>
                      <button type='submit'>
                        <img src={icons.Delete} alt="" />
                      </button>
                    </form>
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

export default Chat;
