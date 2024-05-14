import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useRef, useState } from "react";
import { LuCheckCircle } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import AddResp from "../../components/AdminForms/AddResp";

const ListeResps = () => {
  const containerRef = useRef(null);
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/users`);
        setUsers(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers()
  }, [])
  console.log(users);

  const Responsables = users.filter(user => user.type_utilisateur === 'responsable pédagogique')



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
    <AdminLayout>
      <section className={`px-10 mt-10 ${isModalOpen ? 'opacity-25' : ''}`}>
        <div className="flex justify-between items-center mt-5 mb-10">
          <h1 className="text-4xl font-bold">Liste des stagiaires</h1>
          <button onClick={handleOpenModal} className="flex items-center gap-4 rounded-lg px-4 py-2 bg-black text-white">
            <FaPlus />
            <span>Ajouter</span>
          </button>
        </div>
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
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Id</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Nom Complet</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Téléphone</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Responsables.map((responsable, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.nom}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {responsable.telephone}
                            </td>
                            <td className={`px-6 py-4 flex justify-start gap-5 whitespace-nowrap font-medium text-2xl text-[#00FF00] `}>
                              <LuCheckCircle />
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddResp
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </AdminLayout>
  )
};

export default ListeResps
