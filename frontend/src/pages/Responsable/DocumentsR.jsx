import { useEffect, useRef } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { FaPlus, FaDownload } from "react-icons/fa6";



const DocumentsR = () => {
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
          
        </div>
        <div className="p-3 border border-gray-400 rounded-lg max-h-[440px]" ref={containerRef}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="px-2 overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Nom</th>
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
                      <td className="px-6 py-4 whitespace-nowrap block w-52 truncate text-sm font-medium text-gray-800">
                          Ksioui saad
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
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
                            <img src={icons.Delete} alt="" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                      <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Sedik Abdellah
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
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
                            <img src={icons.Delete} alt="" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                      <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Benbouhia Aymen
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap gap-1">
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
      </section>
    </UserLayout>
  )
};

export default DocumentsR
