import { useEffect, useRef } from "react";
import UserLayout from "../../layouts/UserLayout";
import { icons } from "../../constants";
import { LuCheckCircle } from "react-icons/lu";

const ListeStagiaires = () => {
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
        <h1 className="text-4xl font-bold">Liste des stagiaires</h1>
        <div className="my-6 flex items-center justify-center">
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
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Nom Complet</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Téléphone</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Ksioui Saad
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          saad@gmail.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          0691191101
                        </td>
                        <td className={`px-6 py-4 flex justify-start gap-5 whitespace-nowrap font-medium text-2xl text-[#00FF00] `}>
                          <LuCheckCircle />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Sedik Abdellah
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          abdellah@gmail.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          0691191101
                        </td>
                        <td className={`px-6 py-4 flex justify-start gap-5 whitespace-nowrap font-medium text-2xl text-[#00FF00] `}>
                          <LuCheckCircle />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap block w-52 truncate  text-sm font-medium text-gray-800">
                          Benbouhia Aymen
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          aymen@gmail.com
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          0691191101
                        </td>
                        <td className={`px-6 py-4 flex justify-start gap-5 whitespace-nowrap font-medium text-2xl text-[#00FF00] `}>
                          <LuCheckCircle />
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

export default ListeStagiaires
