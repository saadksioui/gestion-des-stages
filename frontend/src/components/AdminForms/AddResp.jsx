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
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-50">
      <div className="relative bg-white shadow-md mx-auto my-20 w-3/4 h-fit pt-3 pb-2 px-3 rounded-lg">
        <div className="flex justify-between items-center border-b-[1px] border-[#99999] w-full px-3 pb-5">
          <h1 className="text-2xl font-semibold">Ajouter un responsable</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-3xl" onClick={onClose}>
            <FaXmark />
          </button>
        </div>
        {/* Body */}
        <div className="my-3">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 mb-4">
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="nom">Nom:</label>
                <input type="text" className="border h-10 rounded-md py-2 px-2 outline-none" value={nom} onChange={e => setNom(e.target.value)} />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input type="text" className="border h-10 rounded-md py-2 px-2 outline-none" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <label htmlFor="telephone">Telephone:</label>
                <input type="text" className="border h-10 rounded-md py-2 px-2 outline-none" value={telephone} onChange={e => setTelephone(e.target.value)} />
              </div>
            </div>
            {/* Footer */}
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
  )
};

export default AddResp
