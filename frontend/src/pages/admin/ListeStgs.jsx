import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LuCheckCircle } from "react-icons/lu";
import UserLayout from "../../layouts/UserLayout";


const ListeStgs = () => {
  const containerRef = useRef(null);
  const [users, setUsers] = useState([])

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

  const Stagiaires = users.filter(user => user.type_utilisateur === 'étudiant')



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
                        Stagiaires.map((stagiaire, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {stagiaire._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {stagiaire.nom}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {stagiaire.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {stagiaire.telephone}
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
    </UserLayout>
  )
};

export default ListeStgs
