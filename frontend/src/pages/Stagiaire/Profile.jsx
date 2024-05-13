import { images } from "../../constants";
import UserLayout from "../../layouts/UserLayout";
import { IoMail } from "react-icons/io5";
import { FaBarcode, FaGraduationCap } from "react-icons/fa6";
import StagiaireForm from "../../components/StagiaireForm";
import { useState } from "react";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <UserLayout>
      <section className="px-10 mt-10">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="mt-10 p-10 flex gap-10 relative rounded-xl border border-[#999999]">
          <div>
            <img src={images.DefaultUserPfp} className="drop-shadow-lg border-4 border-black rounded-full" width={200} alt="" />
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-3xl font-semibold">John Doe</h1>
            <div>
              <p className="text-xl font-medium text-[#999999] flex items-center gap-4">
                <IoMail />
                <span>johndoe@gmail.com</span>
              </p>
              <p className="text-xl font-medium text-[#999999] flex items-center gap-4">
                <FaGraduationCap />
                <span>Diplome: TSWFS</span>
              </p>
              <p className="text-xl font-medium text-[#999999] flex items-center gap-4">
                <FaBarcode />
                <span>Code: 2000020200956</span>
              </p>
            </div>

          </div>
          <button onClick={handleOpenModal} className="absolute top-4 right-4 m-3 px-4 py-2 bg-black text-white font-medium rounded-lg">
            Ajouter votre informations
          </button>
        </div>
      </section>
      <StagiaireForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleCloseModal={handleCloseModal}
      />
    </UserLayout>
  )
};

export default Profile
