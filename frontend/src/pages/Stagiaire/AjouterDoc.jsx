import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';

const AjouterDoc = ({ handleCloseModal }) => {
  const [type, setType] = useState('');
  const [version, setVersion] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for file preview
  const storedData = localStorage.getItem("sessionToken");
  let storedId = storedData.split(",")[1];
  const typesDoc = ['Rapport', 'Presentation', 'Attestation'];
  const versionDoc = ['Dernier version', 'Premier version'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview of the file
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!type || !version || !file) {
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Oops…",
        text: "Veuillez remplir tous les champs requis.",
        confirmButtonColor: "black"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_id', storedId);
      formData.append('type', type);
      formData.append('version', version);
      formData.append('file', file);

      await axios.post(`http://127.0.0.1:8000/api/documents/add`, formData);

      setType('');
      setVersion('');
      setFile(null);
      setFilePreview(null); // Clear file preview after upload

      Swal.fire({
        iconColor: "black",
        icon: "success",
        title: "Success",
        text: "Le document est ajouté avec succès.",
        confirmButtonColor: "black"
      });

      handleCloseModal();
    } catch (error) {
      console.error('Error adding document:', error.message);
      Swal.fire({
        iconColor: "black",
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonColor: "black"
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins">
      <div className="bg-white border-2 w-[90%] lg:w-2/4 h-fit rounded-lg shadow-md px-10 py-5 font-poppins">
        <div className="pb-3 border-b-[1px] border-black flex justify-between items-center">
          <h1 className="text-xl lg:text-3xl font-semibold">Ajouter un document</h1>
          <FaXmark size={27} onClick={handleCloseModal} className="cursor-pointer"/>
        </div>
        <form onSubmit={handleAdd} className="mt-4">
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="type-doc" className="text-xl font-medium">Type:</label>
            <select value={type} onChange={e => setType(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none">
            <option>Selectionner un type</option>
            {
              typesDoc.map(types => (
                <option value={types}>{types}</option>
              ))
            }
            </select>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="version-doc" className="text-xl font-medium">Version:</label>
            <select value={version} onChange={e => setVersion(e.target.value)} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none">
              <option>Selectionner une version</option>
              {
              versionDoc.map(vers => (
                <option value={vers}>{vers}</option>
              ))
            }
            </select>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <label htmlFor="fichier" className="text-xl font-medium">Fichier:</label>
            <input type="file" onChange={handleFileChange} className="border-2 border-[#99999] rounded-md py-2 px-2 outline-none" />
          </div>
          {filePreview && (
            <div className="p-3">
              <img src={filePreview} alt="File Preview" style={{ width: '50px', height: '50px' }} />
            </div>
          )}
          <div className="p-3">
            <button type="submit" className="bg-black py-2 px-4 text-white rounded-xl flex items-center justify-center w-full mt-2 text-lg">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterDoc;
