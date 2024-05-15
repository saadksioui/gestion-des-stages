import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import EntrepriseForm from "../../components/EntrepriseForm";
import Swal from "sweetalert2";
import axios from "axios";

const ListeStageE = () => {
  const [stages, setStages] = useState([])

  const storedData = localStorage.getItem("sessionToken");
  let stored;

  try {
    if (storedData) {
      stored = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }

  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stage/entreprise/${stored[1]}`);
        setStages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers()
  }, [stored[1]])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <UserLayout>
      <section className="px-10 mt-10">
        <h1 className="text-4xl font-bold">Liste des stages</h1>
        <button onClick={handleOpenModal} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4">
          Ajouter un stage
        </button>
        
        <div className="my-6 flex items-center justify-between">
          <form action="" >
          </form>
          <form action="" className="w-[425px] h-[72px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <input type="text" placeholder="Tapez quelque chose...." className="outline-none rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-black pl-2" />
            <button type="submit" className="p-3 text-white bg-black rounded-xl">Rechercher</button>
          </form>
        </div>
        <div className="p-3 border border-gray-400 rounded-lg max-h-[440px]" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Titre de stage</th>
                        <th scope="col" className="px-6 py-3 flex items-center gap-3 text-start font-semibold">
                          <span>Durée de stage</span>
                          <a href="#">
                            <img src={icons.ArrowSwitched} className="size-4" alt="" />
                          </a>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Domaine</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Date debut</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stages.map((stage,i)=>(
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                            {stage.titre}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {stage.duree} mois
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {stage.domaine}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {stage.date_debut.substring(0, 10)}
                          </td>
                          <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
                            <a href="#">
                              <img src={icons.Info} alt="" />
                            </a>
                            <a href="#">
                              <img src={icons.Edit} alt="" />
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
      </section>

      <EntrepriseForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCloseModal={handleCloseModal}
      />
    </UserLayout>
  )
};

export default ListeStageE;
