import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { TbPointFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios"; // Add this line
import { MdDomain } from "react-icons/md";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

const Demandes = () => {
  const containerRef = useRef(null);
  const [demandes, setDemandes] = useState([]);
  const storedData = localStorage.getItem("sessionToken");
  const storedId = storedData ? storedData.split(",")[1] : null; // Check if storedData exists

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
    const fetchDemandes = async () => {
      try {
        if (storedId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/candidature/demandes/${storedId}`);
          setDemandes(response.data);
        }
      } catch (error) {
        toast.error("Error fetching demandes:", error);
      }
    };

    fetchDemandes();
  }, [demandes]);

  async function deleteOne(id){
    const response = await axios.delete(`http://127.0.0.1:8000/api/candidature/delete/${id}`);
  }
  return (
    <UserLayout>
      <section className="px-10 mt-10">
        <h1 className="text-4xl font-bold">Demandes</h1>
        <div className="my-6 flex items-center justify-end">
          <form action="" className="w-[425px] h-[72px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <input type="text" placeholder="Tapez quelque chose...." className="outline-none rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-black pl-2" />
            <button type="submit" className="p-3 text-white bg-black rounded-xl">Rechercher</button>
          </form>
        </div>
        <div className="p-3 hidden lg:block border border-gray-400 rounded-lg max-h-[440px]" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Titre de stage</th>
                        <th scope="col" className="px-6 py-3 flex items-center gap-3 text-start font-semibold">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Domaine</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandes.length === 0 ? (
                        <tr>
                          <td className="text-center" colSpan="4">
                            <h1 className="text-2xl font-bold text-center">Aucune demande</h1>
                            <Link to={'/liste-stages'}>Créer une demande du stage</Link>
                          </td>
                        </tr>
                      ) : (
                        demandes.map((demande, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                              {demande.titre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap gap-1">
                              <div className="flex items-center w-fit px-2 py-1 rounded-lg">
                                {demande.statut_candidature}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {demande.domain}
                            </td>
                            <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
                              <a href="#">
                                <img src={icons.Info} alt=""  />
                              </a>
                              <a href="#">
                                <img src={icons.Delete} alt="" onClick={()=>deleteOne(demande._id)}/>
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10">
          {demandes.length === 0 ? (
            <tr>
              <td className="text-center" colSpan="4">
                <h1 className="text-2xl font-bold text-center">Aucune demande</h1>
                <Link to={'/liste-stages'}>Créer une demande du stage</Link>
              </td>
            </tr>
          ) : (
            demandes.map((demande, index) => (
              <div className="bg-black pt-3 rounded-xl">
                <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#1b212d]">{demande.titre}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className=" flex items-center gap-2 py-1 px-2 rounded-lg w-fit bg-[#1565d833] text-[#1565D8]">
                      <TbPointFilled className="text-xl" />
                      <span className="font-semibold">
                        {demande.statut_candidature}
                      </span>
                    </div>
                    <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                      <MdDomain className="text-lg" />
                      <span className="font-semibold">{demande.domain}</span>
                    </div>
                  </div>
                  <div className="flex justify-end items-end gap-5">
                    <button className="py-2 px-4 rounded-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                      Info
                      <FaInfoCircle />
                    </button>
                    <button className="py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                      Supprimer
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            )))}

        </div>
      </section>
    </UserLayout>
  )
};

export default Demandes;
