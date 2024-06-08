import React from "react";
import { FaTimes } from "react-icons/fa";
import moment from 'moment';
import { TbPointFilled } from "react-icons/tb";

const Modal = ({ isOpen, onClose, demande, stageData }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return dateString ? moment(dateString.substring(0, 10)).format('YYYY-MM-DD') : 'N/A';
  };
  const demandeStatut = {
    'en attente': ["bg-[#1565d833]", "text-[#1565D8]"],
    'accepte': ["bg-[#00ff0024]", "text-[#029802]"],
    'refusee': ["bg-[#ff00002b]", "text-[#FF0000]"],
  }
  const getStatusClasses = (status) => {
    return demandeStatut[status]
      ? `${demandeStatut[status][0]} ${demandeStatut[status][1]} flex items-center gap-2 py-1 px-2 rounded-lg w-fit`
      : "";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-50">
      <div className="relative bg-white shadow-md mx-auto my-20 w-3/4 h-fit p-6 rounded-lg">
        <div className="w-full">
          <div className="text-3xl absolute top-0 right-0 mt-2 mr-4 pb-14 text-gray-900 cursor-pointer">
            <button className="w-10 h-10 flex items-center justify-center rounded-full">
              <FaTimes onClick={onClose} className="text-gray-600 text-2xl cursor-pointer" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8 my-5">
            <div>
              <label className="block text-lg font-semibold text-gray-800">Titre de stage:</label>
              <p className="text-lg text-gray-600 pl-4">{demande.titre}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Statut:</label>
              <div className={getStatusClasses(demande.statut_candidature)}>
                <TbPointFilled className="text-xl" />
                <span className="font-semibold">
                  {demande.statut_candidature}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Domaine:</label>
              <p className="text-lg text-gray-600 pl-4">{demande.domain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
