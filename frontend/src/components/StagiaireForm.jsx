import { FaXmark } from "react-icons/fa6";
import React, { useState } from 'react';

const StgForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState(null);
  const [cv, setCv] = useState(null);
  const [visible, setVisible] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    setCv(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //...
  };
  const onClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;}

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 cursor-cell">
      <div className="bg-white h-[541px] my-5 overflow-y-scroll p-6 rounded-lg w-[80%] max-w-md">
        <div className='flex items-center mb-4 justify-between'>
          <h2 className="text-2xl font-bold">Ajouter Vos Information</h2>
          <button className="size-10 border-2 border-black rounded-full flex items-center justify-center" onClick={onClose}>
            <FaXmark />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="max-w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image de profil:
              <input type="file" accept="image/*" onChange={handleImgChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nom:
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label></div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Prénom:
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label></div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Téléphone:
              <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label></div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label></div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              CV (PDF):
              <input type="file" accept=".pdf" onChange={handleCvChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </label></div>
          <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl w-full" type="submit" >Soumettre</button>


          {img && (
            <div className="mb-4">
              <p className="block text-red-700 font-bold mb-2 content-center">Image de profil:</p>
              <img class="rounded-full w-40 h-40  max-w-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 " src={URL.createObjectURL(img)} alt="Image de profil" width="200" />
            </div>
          )}
          {cv && (
            <div className="mb-4">
              <p className="block text-red-700 font-bold mb-2 content-center">CV (PDF):</p>
              <embed className="w-50 h-50    border border-gray-300 rounded-lh"src={URL.createObjectURL(cv)} width="200" height="200" type="application/pdf" />
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default StgForm;
