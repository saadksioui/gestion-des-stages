import { FaXmark } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const StagiaireForm = ({ isOpen, onClose, handleCloseModal }) => {
  const storedData = localStorage.getItem("sessionToken");
  let storedId;
  const storedRole = storedData ? storedData.split(",")[2] : 'visiter';
  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }

  const [nomCompletD, setNomCompletD] = useState('');
  const [telephoneD, setTelephoneD] = useState('');
  const [emailD, setEmailD] = useState('');
  const [siteWebD, setSiteWebD] = useState('');
  const [imgD, setImgD] = useState(null);
  const [cvD, setCvD] = useState(null);
  const [nomComplet, setNomComplet] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [img, setImg] = useState(null);
  const [cv, setCv] = useState(null);


  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  useEffect(() => {
    if (storedId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
          console.log(response.data);
          setNomCompletD(response.data.nom || '');
          setTelephoneD(response.data.telephone || '');
          setEmailD(response.data.email || '');
          setSiteWebD(response.data.siteWeb || '');
          setImgD(response.data.img_url || null);
          setCvD(response.data.cv_url || null);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
    }
  }, [storedId]);
  const handleCvChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (file && file.size > maxFileSize) {
      alert('File size exceeds the maximum limit of 5MB.');
      e.target.value = null
      setCv()
    }
    else {
      setCv(file);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData = {
      img: img ? img : imgD,
      nom: nomComplet,
      telephone: telephone,
      email: email,
      cv: cv ? cv : cvD,
    }
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.put(
        `http://127.0.0.1:8000/api/auth/update/${storedId[1]}`,
        formData
      );

      if (response) {
        console.log('User updated successfully');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }


  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-50">
      <div className="relative bg-white shadow-md mx-auto my-20 w-3/4 h-4/5 overflow-y-scroll p-6 rounded-lg">
        <div className='flex justify-between items-center border-b-[1px] border-[#99999] w-full px-3 pb-5'>
          <h1 className="text-2xl font-semibold">Ajouter Vos Information</h1>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full text-3xl" >
            <FaXmark />
          </button>
        </div>
        <div className="my-3 ">

          <form onSubmit={handleSubmit} >
            {(storedRole === 'étudiant') && (
              <div className="grid grid-cols-1 gap-5">
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Image de profil:
                  </label>
                  <input type="file" accept=".png, .jpeg, .jpg" onChange={handleImgChange} className="border rounded-md py-2 px-2 outline-none" />
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Nom Complet:
                  </label>
                  <input type="text" placeholder={nomCompletD} value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    EmailD:
                  </label>
                  <input type="email" disabled placeholder={emailD} value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Téléphone:
                  </label>
                  <input type="tel" placeholder={telephoneD} value={telephone} onChange={(e) => setTelephone(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    CV (PDF):
                  </label>
                  <input type="file" accept=".pdf" onChange={handleCvChange} className="border rounded-md py-2 px-2 outline-none" maxFileSize={5 * 1024 * 1024} />
                </div>
              </div>
            )}
            {(storedRole === 'responsable pédagogique') && (
              <div className="grid grid-cols-1 gap-5">
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Image de profil:
                  </label>
                  <input type="file" accept=".png, .jpeg, .jpg" onChange={handleImgChange} className="border rounded-md py-2 px-2 outline-none" />
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Nom Complet:
                  </label>
                  <input type="text" value={nomCompletD} onChange={(e) => setNomCompletD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    EmailD:
                  </label>
                  <input type="emailD" value={emailD} onChange={(e) => setEmailD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Téléphone:
                  </label>
                  <input type="tel" value={telephoneD} onChange={(e) => setTelephoneD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
              </div>
            )}
            {(storedRole === 'entreprise') && (
              <div className="grid grid-cols-1 gap-5">
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Image de profil:
                  </label>
                  <input type="file" accept=".png, .jpeg, .jpg" onChange={handleImgChange} className="border rounded-md py-2 px-2 outline-none" />
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Nom Complet:
                  </label>
                  <input type="text" value={nomCompletD} onChange={(e) => setNomCompletD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    EmailD:
                  </label>
                  <input type="emailD" value={emailD} onChange={(e) => setEmailD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Téléphone:
                  </label>
                  <input type="tel" value={telephoneD} onChange={(e) => setTelephoneD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <label >
                    Site Web:
                  </label>
                  <input type="tel" value={siteWebD} onChange={(e) => setSiteWebD(e.target.value)} className="border rounded-md py-2 px-2 outline-none" />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-10 items-center w-full pt-2">
              <button onClick={onClose} className="text-red-600">Fermer</button>
              <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center text-lg">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StagiaireForm;
