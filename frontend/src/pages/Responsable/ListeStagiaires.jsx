import { useEffect, useRef, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { LuCheckCircle } from "react-icons/lu";
import axios from "axios";

const ListeStagiaires = () => {
  const containerRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [filteredStages, setFilteredStages] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/users`);
        setUsers(response.data);

        // Set initial filtered stages to all stagiaires
        const stagiaires = response.data.filter(user => user.type_utilisateur === 'étudiant');
        setFilteredStages(stagiaires);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Adjust scroll behavior based on content height
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }
  }, [filteredStages]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTitle) {
      // If search is empty, show all stagiaires
      setFilteredStages(users.filter(user => user.type_utilisateur === 'étudiant'));
    } else {
      // Filter stagiaires by search title
      const filtered = users.filter(user =>
        user.type_utilisateur === 'étudiant' &&
        user.nom.toLowerCase().includes(searchTitle.toLowerCase())
      );
      setFilteredStages(filtered);
    }
  };

  return (
    <UserLayout>
      <section className="px-10 mt-10">
        <h1 className="text-4xl font-bold">Liste des stagiaires</h1>
        <div className="my-6 flex items-center justify-center">
          <form onSubmit={handleSearch} className="w-[425px] h-[72px] flex justify-between items-center px-3 border border-[#D6D6D6] rounded-xl bg-[#F6F6F6]">
            <input
              type="text"
              placeholder="Tapez titre...."
              value={searchTitle}
              onChange={e => setSearchTitle(e.target.value)}
              className="outline-none rounded-xl bg-[#F6F6F6] placeholder:text-[#999999] text-black pl-2"
            />
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
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Nom Complet</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Email</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Téléphone</th>
                        <th scope="col" className="px-6 py-3 text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredStages.map((stagiaire, index) => (
                          <tr key={index}>
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
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10 p-4 bg-white rounded-lg border shadow-md">
          <div className="mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">Votre stagiaires</h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {filteredStages.map((stagiaire, index) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full object-cover" src={`/images_cv/${stagiaire.img_url}`} alt="Neil image" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 ">
                      {stagiaire.nom}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      {stagiaire.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </UserLayout>
  );
};

export default ListeStagiaires;
