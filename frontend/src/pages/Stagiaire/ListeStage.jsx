import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import EntrepriseForm from "../../components/EntrepriseForm";
import Swal from "sweetalert2";
import axios from "axios";
import StageInfo from "../../components/StageInfo";
import { toast } from "react-toastify";
import { MdDomain, MdTimer } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";


const ListeStage = () => {
  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData?.split(",")[2];
  let stored;
  const [stages, setStages] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [filteredStages, setFilteredStages] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [stageData, setStageData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  try {
    if (storedData) {
      stored = storedData.split(",");
    }
  } catch (error) {
    toast.error('Error parsing session token:', error);
  }

  const containerRef = useRef(null);

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/stage/');
        setStages(response.data);
      } catch (error) {
        toast.error("Error fetching stages:", error);
      }
    };

    fetchStages();
  }, []);

  const fetchStageData = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/stage/onestage/${id}`);
      setStageData(response.data);
      if (stageData) setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching stage data:", error);
    }
  };
  useEffect(() => {
    let filteredData = [...stages];

    if (selectedDomain !== "") {
      filteredData = filteredData.filter(stage => stage.domaine === selectedDomain);
    }
    if (searchTitle !== "") {
      filteredData = filteredData.filter(stage => stage.titre.toLowerCase().includes(searchTitle.toLowerCase()));
    }

    setFilteredStages(filteredData);
  }, [selectedDomain,searchTitle, stages]);

  const handleSelectChange = (e) => {
    setSelectedDomain(e.target.value);
  };
  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };
  const handleSortByDuree = () => {
    const sortedStages = [...filteredStages];
    sortedStages.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.duree - b.duree;
      } else {
        return b.duree - a.duree;
      }
    });
    setFilteredStages(sortedStages);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  //* send demande
  async function sendDemande(){
    const data = {
      id_utilisateur: "6641c55fbc200003e4d07c7e",
      id_stage: "66402dfc3bef34ea2c60edcb",
      domain: "Design",
      titre: "Stage de design graphique",
      date_candidature: "2024-05-05T00:00:00.000Z",
      statut_candidature: "en attente"
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/candidature/add", data);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
    }
  }
  return (
    <UserLayout>
      <section className={`px-4 lg:px-10 mt-10 ${isModalOpen ? 'opacity-25' : ''}`}>
        <h1 className="text-2xl lg:text-4xl font-bold">Liste des stages</h1>
        {storedRole === 'entreprise' ? (
          <button onClick={handleOpenModal} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4">
            Ajouter un stage
          </button>
        ) : null}

        <div className="my-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <form className="w-full lg:w-[308px] h-[47px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <select id="liste-domaines" className="outline-none rounded-xl w-full bg-[#F6F6F6] text-[#999999] pl-2"  onChange={handleSelectChange}>
              <option value="">Tous les domaines</option>
              {Array.from(new Set(stages.map(item => item.domaine))).map((domaine, i) => (
                <option key={i} value={domaine} className="text-black">{domaine}</option>
              ))}
            </select>
          </form>
          <form action="" className="w-[425px] h-[72px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <input type="text" placeholder="Tapez titre...." value={searchTitle} onChange={handleSearchTitleChange} className="outline-none rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-black pl-2" />
            <button type="submit" className="p-3 text-white bg-black rounded-xl">Rechercher</button>
          </form>
        </div>
        <div className="hidden lg:block p-3 border border-gray-400 rounded-lg max-h-[440px] overflow-y-auto" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-2 lg:px-6 py-3 text-start font-semibold">Titre de stage</th>
                        <th scope="col" className="px-2 lg:px-6 py-3 text-start font-semibold">Description</th>
                        <th scope="col" className="px-2 lg:px-6 py-3 flex items-center gap-3 text-start font-semibold"  onClick={handleSortByDuree}>
                          <span>Durée de stage</span>
                          <a href="#">
                            <img src={icons.ArrowSwitched} className="size-4" alt="Arrow icon" />
                          </a>
                        </th>
                        <th scope="col" className="px-2 lg:px-6 py-3 text-start font-semibold">Domaine</th>
                        <th scope="col" className="px-2 lg:px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStages.map((stage, index) => (
                        <tr key={index}>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap w-52 truncate text-sm font-medium text-gray-800">
                            {stage.titre}
                          </td>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap block w-52 truncate text-sm font-medium text-gray-800">
                            {stage.description}
                          </td>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {stage.duree} mois
                          </td>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {stage.domaine}
                          </td>
                          <td className="px-2 lg:px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800">
                            <button onClick={(e) => fetchStageData(stage._id)}>
                              <img src={icons.Info} alt="Info icon" />
                            </button>
                            <a onClick={()=>sendDemande(stage._id,stage.titre,stage.domaine)}>
                              <img src={icons.Edit} alt="Edit icon" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10">
          {stages?.map((stage, index) => (
            <div key={index} className="bg-black pt-3 rounded-xl">
              <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#1b212d]">{stage.titre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#292929]">{stage.description}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-[#CCEDED] text-[#069F9F] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                    <MdTimer className="text-xl" />
                    <span className="font-semibold">Durée : {stage.duree} mois</span>
                  </div>
                  <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                    <MdDomain className="text-xl" />
                    <span className="font-semibold">Domaine : {stage.domaine}</span>
                  </div>
                </div>
                <div className="flex justify-end items-end gap-5">
                  <button onClick={(e) => fetchStageData(stage._id)} className="py-2 px-4 rounded-lg border-2 border-[#A1DD70] hover:bg-[#A1DD70] hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Info
                    <FaInfoCircle />
                  </button>
                  <button className="py-2 px-4 rounded-lg border-2 border-[#A1DD70] hover:bg-[#A1DD70] hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Postuler
                    <TfiWrite />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {storedRole === "entreprise" ? (
        <EntrepriseForm isOpen={isModalOpen} onClose={handleCloseModal} handleCloseModal={handleCloseModal} />
      ) : (
        <StageInfo isOpen={isModalOpen} onClose={handleCloseModal} stageData={stageData} />
      )}
    </UserLayout>
  );
};

export default ListeStage;
