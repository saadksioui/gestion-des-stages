import { Link, useLocation } from "react-router-dom";
import { icons, images } from "../constants";
import { IoBusiness } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";

const AdminSidebar = () => {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };
  return (
    <section className="flex flex-col w-full gap-1 bg-black h-full">
      <div className="flex justify-center items-center h-1/5 mb-12">
        <img src={images.ISFOLogo} className="w-44" alt="" />
      </div>
      <div className="w-3/4 mx-auto h-3/5">
        <div className="flex-1 w-full">
          <h1 className="font-montserrat text-white">MENU</h1>
          <ul className="flex flex-col items-start gap-10 mt-10 w-full text-white">
            <li>
              <Link to={'/admin/liste-des-stagiaires'} className={`flex gap-3 ${isActiveRoute('/admin/liste-des-stagiaires') ? 'text-white' : 'text-[#999999]'}`}>
                <FaGraduationCap className="text-2xl"/>
                <span className="text-xl">Liste des stagiaires</span>
              </Link>
            </li>
            <li>
              <Link to={'/admin/liste-des-responsables'} className={`flex gap-3 ${isActiveRoute('/admin/liste-des-responsables') ? 'text-white' : 'text-[#999999]'}`}>
                <MdSupervisorAccount className="text-2xl"/>
                <span className="text-xl">Liste des responsables</span>
              </Link>
            </li>
            <li>
              <Link to={'/admin/liste-des-entrprises'} className={`flex gap-3 ${isActiveRoute('/admin/liste-des-entrprises') ? 'text-white' : 'text-[#999999]'}`}>
                <IoBusiness className="text-2xl"/>
                <span className="text-xl">Liste des entreprise</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default AdminSidebar
