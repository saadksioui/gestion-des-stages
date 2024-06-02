import { images } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { IoMail } from "react-icons/io5";
import { FaBarcode, FaGraduationCap, FaPhone } from "react-icons/fa6";
import StagiaireForm from "../../components/StagiaireForm";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [User, setUser] = useState([]);
  const storedData = localStorage.getItem("sessionToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  let storedId;

  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
        setUser(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserLayout>
      <section className={`px-6 lg:px-10 mt-6 lg:mt-10 ${isModalOpen ? 'opacity-25' : ''}`}>
        <h1 className="text-3xl lg:text-4xl font-bold">Profile</h1>
        <div className="mt-6 lg:mt-10 p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 relative rounded-xl border border-gray-300 bg-white shadow-lg">
          <div className="flex justify-center lg:justify-start">
            <img src={`images_cv/${User.img_url}`} className="w-32 h-32 lg:w-56 lg:h-56 drop-shadow-lg border-4 border-gray-300 rounded-full object-cover" alt="Profile" />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 className="text-2xl lg:text-3xl font-semibold">{User.nom}</h1>
            <div className="text-lg lg:text-xl font-medium text-gray-600">
              <p className="flex items-center gap-2 lg:gap-4">
                <IoMail className="text-xl lg:text-2xl" />
                <span>{User.email}</span>
              </p>
              <p className="flex items-center gap-2 lg:gap-4">
                <FaGraduationCap className="text-xl lg:text-2xl" />
                <span>Diplome: TSWFS</span>
              </p>
              <p className="flex items-center gap-2 lg:gap-4">
                <FaPhone className="text-xl lg:text-2xl" />
                <span>{User.telephone}</span>
              </p>
              <p className="flex items-center gap-2 lg:gap-4">
                <FaBarcode className="text-xl lg:text-2xl" />
                <span>Code: 2000020200956</span>
              </p>
            </div>
          </div>
          <button onClick={handleOpenModal} className="absolute top-4 right-4 lg:top-6 lg:right-6 px-4 py-2 bg-black text-white font-medium w-32 lg:w-fit rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300">
            Ajouter vos informations
          </button>
        </div>
      </section>
      <StagiaireForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCloseModal={handleCloseModal}
      />
    </UserLayout>
  );
};

export default Profile;
