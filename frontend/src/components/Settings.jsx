import { useState } from "react";
import Swal from "sweetalert2";

const Settings = ({ handleCloseModal }) => {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const handleUpdate = (e) => {
    e.preventDefault()

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
    }
    else {
      const passwordData = {
        currentPwd: currentPwd,
        newPwd: newPwd,
        confirmPwd: confirmPwd,
      }

      console.log("Password updated:", passwordData);

      setCurrentPwd('')
      setNewPwd('')
      setConfirmPwd('')

      handleCloseModal();
    }
  }

  return (
    <div className="absolute z-10 top-32 bg-[#f8f8f8] right-4 w-1/4 h-fit rounded-lg shadow-md px-10 py-5 font-poppins">
      <h1 className="text-center text-3xl font-semibold pb-3 border-b-[1px] border-black">Paramètres</h1>
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
  )
};

export default Settings