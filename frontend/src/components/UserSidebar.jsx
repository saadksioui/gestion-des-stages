import { useEffect, useState } from "react";
import { icons, images } from "../constants";
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  const storedData = localStorage.getItem("sessionToken");
  let storedRole = storedData.split(",");

  const [dropdown, setDropDown] = useState(false)
  const [role, setRole] = useState()
  useEffect(() => {
  if(storedRole[2] == 'étudiant'){
    setRole(
      <div className="flex flex-col w-3/4 mx-auto items-start justify-between h-3/5">
        <div className="flex-1 w-full">
          <h1 className="font-montserrat text-white">MENU</h1>
          <ul className="flex flex-col items-start gap-5 mt-10 w-full text-white">
            <li className={`flex flex-col items-center justify-between w-full`}>
              <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                  <img src={icons.GraduationCap} alt="" />
                  <span>Stage</span>
                </div>
                <button onClick={() => setDropDown(!dropdown)}>
                  <img src={icons.ArrowContained} className={`${dropdown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`} alt="" />
                </button>
              </div>
              <ul className={`${dropdown ? 'flex flex-col items-start gap-5 mt-5' : 'hidden'}`}>
                <li>
                  <Link to="/liste-stages">
                    Liste des stages
                  </Link>
                </li>
                <li>
                  <Link to="/demandes">
                    Demandes
                  </Link>
                </li>
              </ul>

            </li>
            <li>
              <Link to={'/documents'} className={`flex items-center gap-3`}>
                <img src={icons.File} alt="" />
                <span>Documents</span>
              </Link>
            </li>
            <li>
              <Link to={'/chat'} className={`flex items-center gap-3`}>
                <img src={icons.Mail} alt="" />
                <span>Message</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/contact" className={`flex items-center gap-3 text-white`}>
            <img src={icons.Support} alt="" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    )
  }
  else if(storedRole[2] == 'entreprise'){
    setRole(
      <div className="flex flex-col w-3/4 mx-auto items-start justify-between h-3/5">
        <div className="flex-1 w-full">
          <h1 className="font-montserrat text-white">MENU</h1>
          <ul className="flex flex-col items-start gap-5 mt-10 w-full text-white">
            <li className={`flex flex-col items-center justify-between w-full`}>
              <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                  <img src={icons.GraduationCap} alt="" />
                  <span>Stage</span>
                </div>
                <button onClick={() => setDropDown(!dropdown)}>
                  <img src={icons.ArrowContained} className={`${dropdown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`} alt="" />
                </button>
              </div>
              <ul className={`${dropdown ? 'flex flex-col items-start gap-5 mt-5' : 'hidden'}`}>
                <li>
                  <Link to="/liste-stages">
                    Liste des stages
                  </Link>
                </li>
                <li>
                  <Link to="/demandes">
                    Demandes
                  </Link>
                </li>
              </ul>

            </li>
            
          </ul>
        </div>
        <div>
          <Link to="/contact" className={`flex items-center gap-3 text-white`}>
            <img src={icons.Support} alt="" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    )
  }
  else if(storedRole[2]=='responsable pédagogique'){
    setRole(
      <div className="flex flex-col w-3/4 mx-auto items-start justify-between h-3/5">
        <div className="flex-1 w-full">
          <h1 className="font-montserrat text-white">MENU</h1>
          <ul className="flex flex-col items-start gap-5 mt-10 w-full text-white">
            <li className={`flex flex-col items-center justify-between w-full`}>
              <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                  <img src={icons.GraduationCap} alt="" />
                  <span>stagiaires</span>
                </div>
                <button onClick={() => setDropDown(!dropdown)}>
                  <img src={icons.ArrowContained} className={`${dropdown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'}`} alt="" />
                </button>
              </div>
              <ul className={`${dropdown ? 'flex flex-col items-start gap-5 mt-5' : 'hidden'}`}>
                <li>
                  <Link to="/liste-stages">
                    Liste des stagiaires
                  </Link>
                </li>
              </ul>

            </li>
            <li>
              <Link to={'/documents'} className={`flex items-center gap-3`}>
                <img src={icons.File} alt="" />
                <span>Documents</span>
              </Link>
            </li>
            <li>
              <Link to={'/chat'} className={`flex items-center gap-3`}>
                <img src={icons.Mail} alt="" />
                <span>Message</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/contact" className={`flex items-center gap-3 text-white`}>
            <img src={icons.Support} alt="" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    )
  }}, [dropdown]);
  return (
    <section className="flex flex-col w-full gap-1 bg-black h-full">
      <div className="flex justify-center items-center h-1/5 mb-12">
        <img src={images.ISFOLogo} className="w-44" alt="" />
      </div>
      {role}
    </section>
  )
};

export default UserSidebar
