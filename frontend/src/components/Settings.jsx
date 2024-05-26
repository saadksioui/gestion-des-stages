import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const Settings = ({ handleCloseModal }) => {
  const storedData = localStorage.getItem("sessionToken");
  let storedId;

  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }


  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const handleUpdate = async (e) => {
    e.preventDefault();

    const emptyFields = [currentPwd, newPwd, confirmPwd].filter(field => field === '').length > 0;

    if (emptyFields) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "Please fill in all required fields.",
        confirmButtonColor: "black"
      });
      return;
    } else if (newPwd !== confirmPwd) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "New password and confirm password do not match.",
        confirmButtonColor: "black"
      });
      return;
    } else {
      try {
        await axios.post(`http://127.0.0.1:8000/api/auth/update-password/${storedId[1]}`, {
          oldPassword: currentPwd,
          newPassword: newPwd
        });

        setCurrentPwd('');
        setNewPwd('');
        setConfirmPwd('');


        Swal.fire({
          iconColor: "black",
          icon: "success",
          title: "Success",
          text: "Password updated successfully.",
          confirmButtonColor: "black"
        });

        handleCloseModal();
      } catch (error) {
        console.error('Error updating password:', error.message);
        Swal.fire({
          iconColor: "black",
          icon: "error",
          title: "Error",
          text: error.message,
          confirmButtonColor: "black"
        });
      }
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
      <div className="bg-white border-2 w-2/4 h-fit rounded-lg shadow-md px-10 py-5 font-poppins">
        <div className="pb-3 border-b-[1px] border-black flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Changer le mot de passe</h1>
          <FaXmark size={27} onClick={handleCloseModal} className="cursor-pointer"/>
        </div>
        <form onSubmit={handleUpdate} className="mt-4">
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="titreStage" className="text-xl font-medium">Mot de passe actuel:</label>
            <input type="text" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
          </div>
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="titreStage" className="text-xl font-medium">Nouveau mot de passe:</label>
            <input type="text" value={newPwd} onChange={e => setNewPwd(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
          </div>
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="titreStage" className="text-xl font-medium">Confirmez le mot de passe:</label>
            <input type="text" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
          </div>
          <div className="p-3">
            <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center w-full mt-2 text-lg">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Settings
