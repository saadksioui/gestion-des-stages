import { FaXmark } from "react-icons/fa6";
import React, { useState } from 'react';

const StagiaireForm = () => {
  const [nomF, setNom] = useState('');
  const [prenomF, setPrenom] = useState('');
  const [telephoneF, setTelephone] = useState('');
  const [emailF, setEmail] = useState('');
  const [imgF, setImg] = useState(null);
  const [cvF, setCv] = useState(null);
  const [visible, setVisible] = useState(true);


  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    setCv(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    //   const emptyFields = [imgF, nomF, prenomF, telephoneF, emailF, cvF,].filter(field => field === '').length > 0;

    //   if (emptyFields) {
    //     Swal.fire({
    //       iconColor: "black",
    //       icon: "error",
    //       title: "Oops…",
    //       text: "Please fill in all required fields.",
    //       confirmButtonColor: "black"
    //     });
    //     return;
    //   }
    //   else {
    //     const stgData = {
    //       img: imgF,
    //       nom: nomF,
    //       prenom: prenomF,
    //       telephone: telephoneF,
    //       email: emailF,
    //       cv: cvF,
    //     }

    //     console.log("Form submitted:", stgData);

    //     setImg('')
    //     setNom('')
    //     setPrenom('')
    //     setTelephone('')
    //     setEmail('')
    //     setCv('')

    //     handleCloseModal();
    //   }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins cursor-cell">
      <div className="border-2 border-black bg-white rounded-xl p-5">
        <div className='flex justify-between items-center border-b-[1px] border-[#99999] w-full pb-5'>
          <h1 className="text-2xl font-semibold">Ajouter Vos Information</h1>
          <button className="size-10 flex items-center justify-center text-lg border-2 border-black rounded-full" >
            <FaXmark />
          </button>
        </div>
        <div className="my-3">
          <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-3 gap-5">
              <div className="p-3 flex flex-col gap-2">
                <label >
                  Image de profil:
                </label>
                <input type="file" accept="image/*" onChange={handleImgChange} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
              </div>

              <div className="p-3 flex flex-col gap-2">
                <label >
                  Téléphone:
                </label>
                <input type="tel" value={telephoneF} onChange={(e) => setTelephone(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <label >
                  CV (PDF):
                </label>
                <input type="file" accept=".pdf" onChange={handleCvChange} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-20 my-4">
              {imgF && (
                <div className="p-3 flex flex-col gap-2">
                  <p>Image de profil :</p>
                  <img src={URL.createObjectURL(imgF)} alt="Image de profil" className="size-48 object-cover" />
                </div>
              )}
              {cvF && (
                <div className="p-3 flex flex-col gap-2">
                  <p>CV (PDF) :</p>
                  <iframe src={URL.createObjectURL(cvF)}  className="size-48 object-cover" type="application/pdf" />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-10 items-center border-t-[1px] border-[#99999] w-full pt-2">
              <button className="text-red-600">Fermer</button>
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
