import { useEffect, useRef } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { TbPointFilled } from "react-icons/tb";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { MdDomain } from "react-icons/md";
import { FaPerson, FaTrash, FaUser } from "react-icons/fa6";


const DemandesE = () => {
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
                          Nom de stagiaire
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">
                          Statut
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
                          Ksioui Saad
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          <div className="flex items-center bg-[#1565d833] text-[#1565D8] w-fit px-2 py-1 rounded-lg">
                            <TbPointFilled className="text-lg" />
                            <span>
                              En cours
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
                          <a href="#">
                            <FaCheck className="text-black-500" />
                          </a>
                          <a href="#">
                            <img src={icons.Info} alt="" />
                          </a>
                          <a href="#">
                            <img src={icons.Delete} alt="" />
                          </a>

                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Sedik Abdellah
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          <div className="flex items-center bg-[#ff00002b] text-[#FF0000] w-fit px-2 py-1 rounded-lg">
                            <TbPointFilled className="text-lg" />
                            <span>En attendant</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
                          <a href="#">
                            <FaCheck className="text-black-500" />
                          </a>
                          <a href="#">
                            <img src={icons.Info} alt="" />
                          </a>
                          <a href="#">
                            <img src={icons.Delete} alt="" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Benbouhia Aymen
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          <div className="flex items-center bg-[#00ff0024] text-[#00FF00] w-fit px-2 py-1 rounded-lg">
                            <TbPointFilled className="text-lg" />
                            <span>Accepté</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Full Stack
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
                          <a href="#">
                            <FaCheck className="text-black-500" />
                          </a>
                          <a href="#">
                            <img src={icons.Info} alt="" />
                          </a>
                          <a href="#">
                            <img src={icons.Delete} alt="" />
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
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10">

          <div className="bg-black pt-3 rounded-xl">
            <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#1b212d]">Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <FaUser className="text-lg" />
                  <span className="font-semibold">Ksioui Saad</span>
                </div>
                <div className=" flex items-center gap-2 py-1 px-2 rounded-lg w-fit bg-[#1565d833] text-[#1565D8]">
                  <TbPointFilled className="text-xl" />
                  <span className="font-semibold">
                    En cours
                  </span>
                </div>
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <MdDomain className="text-lg" />
                  <span className="font-semibold">Full Stack</span>
                </div>
              </div>
              <div className="flex justify-end items-end gap-5">
                <button className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                  Accepter
                  <FaCheck />
                </button>
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
          <div className="bg-black pt-3 rounded-xl">
            <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#1b212d]">Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <FaUser className="text-lg" />
                  <span className="font-semibold">Sedik Abdellah</span>
                </div>
                <div className=" flex items-center gap-2 py-1 px-2 rounded-lg w-fit bg-[#ff00002b] text-[#FF0000]">
                  <TbPointFilled className="text-xl" />
                  <span className="font-semibold">
                  En attendant
                  </span>
                </div>
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <MdDomain className="text-lg" />
                  <span className="font-semibold">Full Stack</span>
                </div>
              </div>
              <div className="flex justify-end items-end gap-5">
                <button className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                  Accepter
                  <FaCheck />
                </button>
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
          <div className="bg-black pt-3 rounded-xl">
            <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#1b212d]">Lorem ipsum dolor sitsdqdsqdfsqdfsqdfsd</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <FaUser className="text-lg" />
                  <span className="font-semibold">Benbouhia Aymen</span>
                </div>
                <div className=" flex items-center gap-2 py-1 px-2 rounded-lg w-fit bg-[#00ff0024] text-[#00FF00]">
                  <TbPointFilled className="text-xl" />
                  <span className="font-semibold">
                  Accepté
                  </span>
                </div>
                <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <MdDomain className="text-lg" />
                  <span className="font-semibold">Full Stack</span>
                </div>
              </div>
              <div className="flex justify-end items-end gap-5">
                <button className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                  Accepter
                  <FaCheck />
                </button>
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
        </div>
      </section>
    </UserLayout>
  )
};

export default DemandesE
