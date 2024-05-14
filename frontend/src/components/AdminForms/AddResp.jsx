import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const AddResp = ({ isOpen, onClose, handleCloseModal }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  function generatePassword() {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*()-_=+';
    const numbers = '0123456789';

    const allChars = uppercaseChars + lowercaseChars + specialChars + numbers;

    let pwd = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      pwd += allChars[randomIndex];
    }

    return pwd;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emptyFields = [nom, email].filter(field => field === '').length > 0;

    if (emptyFields) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "Please fill in all required fields.",
        confirmButtonColor: "black"
      });
      return;
    }
    else {
      const RespData = {
        nom: nom,
        email: email,
        password: generatePassword(),
      }
      const UserData = {
        nom: nom,
        email: email,
        password: generatePassword(),
        telephone: telephone,
        type_utilisateur: 'responsable pédagogique'
      }

      console.log("Form submitted:", RespData, UserData);

      setNom('')
      setEmail('')
      setTelephone('')

      handleCloseModal();
    }
  }
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
      <div className="border-2 border-black bg-white rounded-xl p-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b-[1px] border-[#99999] w-full pb-5">
          <h1 className="text-2xl font-semibold">Ajouter un responsable</h1>
          <button className="size-10 flex items-center justify-center text-lg border-2 border-black rounded-full" onClick={onClose}>
            <FaXmark />
          </button>
        </div>
        {/* Body */}
        <div className="my-3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 mb-4">
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="titreStage">Nom:</label>
                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={nom} onChange={e => setNom(e.target.value)} />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="description">Email:</label>
                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="description">Telephone:</label>
                <input type="text" className="border-2 border-[#99999] h-8 rounded-md py-2 px-2 outline-none" value={telephone} onChange={e => setTelephone(e.target.value)} />
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-10 items-center border-t-[1px] border-[#99999] w-full pt-2">
              <button onClick={onClose} className="text-red-600">Fermer</button>
              <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center text-lg">
                Ajouter
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
};

export default AddResp
