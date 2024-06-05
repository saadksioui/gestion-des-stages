import { useEffect, useRef } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { FaPlus, FaDownload, FaPen, FaTrash } from "react-icons/fa6";
import { MdOutlineNumbers } from "react-icons/md";



const Documents = () => {
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
        <div className="flex justify-between items-center mt-5 mb-10">
          <h1 className="text-4xl font-bold">Documents</h1>
          <button className="flex items-center gap-4 rounded-lg px-4 py-2 bg-black text-white">
            <FaPlus />
            <span>Ajouter</span>
          </button>
        </div>
        <div className="hidden lg:block p-3 border border-gray-400 rounded-lg max-h-[440px] overflow-y-auto" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Type</th>
                        <th scope="col" className="px-6 py-3 flex items-center gap-3 text-start font-semibold">
                          Stage_id
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Version</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Download</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Rapport
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          122
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center bg-[#26CB8F] text-white w-fit px-2 py-1 rounded-lg">
                            Dernier version
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <button className="flex items-center gap-2">
                            <FaDownload className="text-lg" />
                            <span>Télécharger</span>
                          </button>
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
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
                          Presentation
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          23
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center bg-[#327AF8] text-white w-fit px-2 py-1 rounded-lg">
                            Premier version
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <button className="flex items-center gap-2">
                            <FaDownload className="text-lg" />
                            <span>Télécharger</span>
                          </button>
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
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
                          Attestation
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
                          122
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center bg-[#26CB8F] text-white w-fit px-2 py-1 rounded-lg">
                            Dernier version
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <button className="flex items-center gap-2">
                            <FaDownload className="text-lg" />
                            <span>Télécharger</span>
                          </button>
                        </td>
                        <td className={`px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800`}>
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
                <span className="text-xl font-bold text-[#1b212d]">Presentation</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#CCEDED] text-[#069F9F] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                  <MdOutlineNumbers className="text-xl" />
                  <span className="font-semibold">Stage id : 23</span>
                </div>
                <div className="flex items-center bg-[#26CB8F] text-white w-fit px-2 py-1 rounded-lg">
                  Dernier version
                </div>
              </div>
              <div className="flex justify-end items-end gap-5">
                <button onClick={(e) => fetchStageData(stage._id)} className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                  Modifier
                  <FaPen />
                </button>
                <button className="py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                  Delete
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

export default Documents
