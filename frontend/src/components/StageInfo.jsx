import React from "react";
import { FaXmark } from "react-icons/fa6";
import moment from 'moment';

const StageInfo = ({ isOpen, onClose, stageData }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins cursor-cell">
      <div className="bg-[#fefefe] rounded-lg shadow-md w-2/4 px-10 py-10">
        <div className="w-full h-fit">
          <div className="border-b-[0.5px] border-black pb-3 flex justify-end">
            <button className="size-10 flex items-center justify-center">
              <FaXmark onClick={onClose} className="text-2xl cursor-pointer" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-20 mt-5">
            <div>
              <label className="text-xl font-medium">Titre:</label>
              <p className="text-lg text-[#999999] font-semibold">{stageData.titre}</p>
            </div>
            <div>
              <label className="text-xl font-medium">Description:</label>
              <p className="text-lg text-[#999999] font-semibold">{stageData.description}</p>
            </div>
            <div>
              <label className="text-xl font-medium">Durée du stage:</label>
              <p className="text-lg text-[#999999] font-semibold">{stageData.duree} mois</p>
            </div>
            <div>
              <label className="text-xl font-medium">Domaine:</label>
              <p className="text-lg text-[#999999] font-semibold">{stageData.domaine}</p>
            </div>
            <div>
              <label className="text-xl font-medium">Localisation:</label>
              <p className="text-lg text-[#999999] font-semibold">{stageData.localisation}</p>
            </div>
            <div>
              <label className="text-xl font-medium">Date de début:</label>
              <p className="text-lg text-[#999999] font-semibold">{moment().format(stageData.date_debut.substring(0, 10))}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StageInfo;