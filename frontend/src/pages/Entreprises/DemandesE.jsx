import { useEffect, useRef, useState } from "react";
import { icons } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { TbPointFilled } from "react-icons/tb";
import { FaCheck, FaInfoCircle, FaTrash, FaUser } from "react-icons/fa";
import { MdDomain } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";

const DemandesE = () => {
  const containerRef = useRef(null);
  const storedData = localStorage.getItem("sessionToken");
  const storedId = storedData.split(",")[1];
  const [demandes, setDemandes] = useState([]);

  const demandeStatut = {
    'en attente': ["bg-[#1565d833]", "text-[#1565D8]"],
    'accepter': ["bg-[#00ff0024]", "text-[#029802]"],
    'refuser': ["bg-[#ff00002b]", "text-[#FF0000]"],
  };

  const getStatusClasses = (status) => {
    return demandeStatut[status]
      ? `${demandeStatut[status][0]} ${demandeStatut[status][1]} flex items-center gap-2 py-1 px-2 rounded-lg w-fit`
      : "";
  };

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        // Fetch stages associated with the enterprise
        const stagesResponse = await axios.get(`http://127.0.0.1:8000/api/stage/entreprise/${storedId}`);
        const idsStages = stagesResponse.data;
        console.log(idsStages);
        // Fetch demandes for each stage
        const demandesPromises = idsStages.map(async (idStage) => {
          const demandeResponse = await axios.get(`http://127.0.0.1:8000/api/candidature/search/stage/${idStage._id}`);
          console.log(demandeResponse.data);
          const demandesWithUser = await Promise.all(
            demandeResponse.data.map(async (demande) => {
              console.log(demande.id_utilisateur);
              const userResponse = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${demande.id_utilisateur}`);
              return { ...demande, user: userResponse.data };
            })
          );
          return demandesWithUser;
        });

        const allDemandes = (await Promise.all(demandesPromises)).flat();
        setDemandes(allDemandes);
        console.log(demandes);

        // Set scroll behavior based on content height
        if (containerRef.current) {
          const containerHeight = containerRef.current.clientHeight;
          const childrenHeight = containerRef.current.scrollHeight;
          if (childrenHeight > containerHeight) {
            containerRef.current.classList.add('overflow-y-scroll');
          } else {
            containerRef.current.classList.remove('overflow-y-scroll');
          }
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Error fetching documents. Please try again later.");
      }
    };

    fetchDemandes();
  }, [storedId]);

  const handleAccept = async (id) => {
    await axios.put(`http://127.0.0.1:8000/api/candidature/accept/${id}`)
      .then(() => {
        toast.success("Demande acceptée avec succès");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }
  const handleRefuse = async (id) => {
    await axios.put(`http://127.0.0.1:8000/api/candidature/refuse/${id}`)
      .then(() => {
        toast.success("Demande acceptée avec succès");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
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
                      {demandes.map((demande) => (
                        <tr key={demande._id}>
                          <td className="px-6 py-4 whitespace-nowrap block w-52 truncate text-sm font-medium text-gray-800">
                            {demande.titre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {demande.user.nom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap gap-1">
                            <div className={getStatusClasses(demande.statut_candidature)}>
                              <TbPointFilled className="text-xl" />
                              <span className="font-semibold">
                                {demande.statut_candidature}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {demande.domain}
                          </td>
                          <td className="px-6 py-4 flex items-center gap-5 whitespace-nowrap text-sm text-gray-800">
                            <button onClick={() => handleAccept(demande._id)}>
                              <FaCheck className="text-green-600" />
                            </button>
                            <button onClick={() => handleRefuse(demande._id)}>
                              <FaXmark className="text-red-600 text-xl" />
                            </button>
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
        <div className="lg:hidden grid grid-cols-1 gap-4 mb-10">
          {demandes.map((demande) => (
            <div key={demande._id} className="bg-black pt-3 rounded-xl">
              <div className="rounded-xl shadow-xl p-5 bg-white flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#1b212d]">{demande.titre}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-[#F1F1F1] text-[#7E7E7E] flex items-center gap-2 py-1 px-2 rounded-lg w-fit">
                    <FaUser className="text-lg" />
                    <span className="font-semibold">{demande.user.nom}</span>
                  </div>
                  <div className={getStatusClasses(demande.statut_candidature)}>
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
                  <button onClick={() => handleAccept(demande._id)} className="py-2 px-4 rounded-lg border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Accepter
                    <FaCheck />
                  </button>
                  <button className="py-2 px-4 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition duration-200 font-medium flex items-center gap-2">
                    Supprimer
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </UserLayout>
  );
};

export default DemandesE;
