import React from "react";
import { FaXmark } from "react-icons/fa6";
import moment from 'moment';
import { FaTimes } from "react-icons/fa";

const StageInfo = ({ isOpen, onClose, stageData }) => {
  if (!isOpen) return null;


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
              <label className="block text-lg font-semibold text-gray-800">Titre:</label>
              <p className="text-lg text-gray-600 pl-4">{stageData.titre}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Description:</label>
              <p className="text-lg text-gray-600 pl-4">{stageData.description}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Durée du stage:</label>
              <p className="text-lg text-gray-600 pl-4">{stageData.duree} mois</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Domaine:</label>
              <p className="text-lg text-gray-600 pl-4">{stageData.domaine}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Localisation:</label>
              <p className="text-lg text-gray-600 pl-4">{stageData.localisation}</p>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">Date de début:</label>
              <p className="text-lg text-gray-600 pl-4">{moment().format(stageData.date_debut.substring(0, 10))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default StageInfo;