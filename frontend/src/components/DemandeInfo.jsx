import React from "react";
import { FaTimes } from "react-icons/fa";
import moment from 'moment';

const Modal = ({ isOpen, onClose, demande, stageData }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return dateString ? moment(dateString.substring(0, 10)).format('YYYY-MM-DD') : 'N/A';
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
              <p className="text-lg text-gray-600 pl-4">{demande.titre }</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Statut:</label>
              <p className="text-lg text-gray-600 pl-4">{demande.statut_candidature}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Domaine:</label>
              <p className="text-lg text-gray-600 pl-4">{demande.domain }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
