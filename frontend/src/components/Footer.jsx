import { Link } from "react-router-dom";
import { icons, images } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-black text-white bottom-0 left-0 right-0 flex flex-col gap-10 items-center py-8 font-poppins">
      <div className="w-3/4 mx-auto flex justify-between items-start">
        <aside className="flex flex-col gap-5">
          <img className="w-56 h-24 mb-2" src={images.Logo} alt="Logo" />
          <p className="w-56 ml-4 text-sm">E-stage la meilleur plateforme de gestion des stages.</p>
          <Link to={'/register'} className="w-56 ml-4 text-sm font-medium">Commencer maintenant</Link>
        </aside>
        <nav className="flex flex-col gap-[16px] w-44">
          <h6 className="font-bold mb-2">Contactez nous</h6>
          <div className="flex flex-col gap-3">
            <p className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Mail} alt="" />
              <span>e.stage@gmail.com</span>
            </p>
            <p className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Phone} alt="" />
              <span>(+212) 622 222 222</span>
            </p>
            <p className="font-normal text-gray-100 flex gap-2 items-start">
              <img src={icons.Location} alt="" />
              <span>1029 Route Bouskoura, km 9, 20190 Casablanca</span>
            </p>
          </div>
        </nav>
        <nav className="flex flex-col gap-[16px] w-44">
          <h6 className="font-bold mb-2">Réseaux sociaux</h6>
          <div className="flex flex-col gap-3">
            <a href="https://www.facebook.com" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Facebook} alt="" />
              E-stage
            </a>
            <a href="https://www.instagram.com" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Instagram} alt="" />
              e.stage
            </a>
            <a href="https://www.linkedin.com/" className="font-normal text-gray-100 flex gap-2 items-center">
              <img src={icons.Linkdin} alt="" />
              e.stage
            </a>
          </div>
        </nav>
      </div>
      <div className="copyright w-[65%] mx-auto text-center p-5 border-t-[0.2px] border-white">
        © Copyright 2024 All rights reserved
      </div>
    </footer>
  )
};

export default Footer
