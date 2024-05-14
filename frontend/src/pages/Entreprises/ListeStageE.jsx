import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import EntrepriseForm from "../../components/EntrepriseForm";
import Swal from "sweetalert2";

const ListeStage = () => {
  const storedData = localStorage.getItem("sessionToken");
  let stored;

  try {
    if (storedData) {
      stored = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }
  console.log(stored[2]);
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
        {stored[2] === 'entreprise' ? <button onClick={handleOpenModal} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4">
          Ajouter un stage
        </button> : null}
        
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
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          2 mois
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          2 mois
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          2 mois
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          5 mois
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
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
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          1 mois
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render the Modal component */}
      <EntrepriseForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCloseModal={handleCloseModal}
      />
    </UserLayout>
  )
};

export default ListeStage;
