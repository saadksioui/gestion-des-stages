import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const StageInfo = ({isOpen, onClose, entreprise}) => {
  const [stageData, setStageData] = useState({})

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stage/entreprise/${entreprise}`);
        setStageData(response.data);
      } catch (error) {
        console.error("Error fetching stage data:", error);
      }
    };

    if (isOpen && entreprise) {
      fetchStageData();
    }
  }, [isOpen, entreprise]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen px-10 font-poppins cursor-cell">
      <div className="bg-[#fefefe] rounded-lg shadow-md w-1/4 px-10 py-5">
        <div className="w-full h-fit">
          <div className="border-b-[0.5px] border-black pb-3 flex justify-end">
            <button className="size-10 flex items-center justify-center" >
              <FaXmark onClick={onClose} className="text-2xl cursor-pointer"/>
            </button>
          </div>
          <div className="mt-5">
            <label className="text-xl">Titre:</label>
            <p>{stageData.titre}</p>
          </div>
        </div>
      </div>

    </div>
  )
};

export default StageInfo
