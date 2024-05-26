import { Link } from "react-router-dom";
import { icons, images } from "../constants";
import { FaArrowRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-col gap-10 items-center py-8 font-poppins">
      <div className="w-11/12 lg:w-3/4 mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
        <aside className="flex flex-col justify-start gap-5 w-full lg:w-auto">
          <img className="w-40 lg:w-56 h-20 lg:h-24 mb-2" src={images.WhiteLogo} alt="Logo" />
          <p className="text-sm">E-stage la meilleur plateforme de gestion des stages.</p>
          <Link to={'/register'} className="text-sm text-white flex items-center gap-2 font-medium">
            <span>Commencer maintenant</span>
            <FaArrowRight />
          </Link>
        </aside>
        <nav className="flex flex-col gap-[16px] w-full lg:w-44">
          <h6 className="font-bold mb-2">Contactez nous</h6>
          <div className="flex flex-col gap-3">
            <p className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Mail} alt="Mail Icon" />
              <span>e.stage@gmail.com</span>
            </p>
            <p className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Phone} alt="Phone Icon" />
              <span>(+212) 622 222 222</span>
            </p>
            <p className="font-normal text-gray-100 flex gap-2 items-start">
              <img src={icons.Location} alt="Location Icon" />
              <span>1029 Route Bouskoura, km 9, 20190 Casablanca</span>
            </p>
          </div>
        </nav>
        <nav className="flex flex-col gap-[16px] w-full lg:w-44">
          <h6 className="font-bold mb-2">Réseaux sociaux</h6>
          <div className="flex flex-col gap-3">
            <a href="https://www.facebook.com" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Facebook} alt="Facebook Icon" />
              E-stage
            </a>
            <a href="https://www.instagram.com" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Instagram} alt="Instagram Icon" />
              e.stage
            </a>
            <a href="https://www.linkedin.com/" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Linkdin} alt="LinkedIn Icon" />
              e.stage
            </a>
          </div>
        </nav>
      </div>
      <div className="w-11/12 lg:w-3/4 text-center p-5 border-t-[0.2px] border-white">
        © Copyright 2024 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
