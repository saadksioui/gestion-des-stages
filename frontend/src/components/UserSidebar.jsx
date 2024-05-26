import { useEffect, useState } from "react";
import { images } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { LuChevronFirst } from "react-icons/lu";
import { FaGear, FaGraduationCap } from "react-icons/fa6";
import { IoDocumentText, IoMail, IoMenu, IoSettings } from "react-icons/io5";
import { MdLogout, MdOutlineSupportAgent } from "react-icons/md";
import Settings from "./Settings";
import axios from "axios";

const UserSidebar = () => {
  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData ? storedData.split(",")[2] : '';
  const storedId = storedData ? storedData.split(",")[1] : '';

  const [dropdown, setDropDown] = useState(false);
  const [role, setRole] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [User, setUser] = useState([]);

  const location = useLocation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId}`);
        setUser(response1.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const Logout = () => {
    localStorage.removeItem("sessionToken");
    window.location.href = "http://localhost:5173/";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const generateMenu = (menuItems) => (
      <div className="flex-1 w-full">
        <ul className="flex flex-col items-start gap-5 mt-10 w-full">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col items-center justify-between w-full">
              <div className={`flex items-center justify-between w-full`}>
                <div className={`flex items-center gap-3 px-2 py-2 w-full transition-colors duration-200 ${location.pathname === item.link || item.submenu && item.submenu.some(sub => location.pathname === sub.link) ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'} `}>
                  {item.icon}
                  <Link to={item.link || "#"} className={`text-base `}>
                    {item.title}
                  </Link>
                </div>
                {item.submenu && (
                  <button onClick={() => setDropDown(!dropdown)}>
                    <IoIosArrowDown className={`${dropdown ? 'transform rotate-180 duration-300' : 'transform rotate-0 duration-300'}`} />
                  </button>
                )}
              </div>
              {item.submenu && (
                <ul className={`${dropdown ? 'flex flex-col items-start gap-2 mt-2 border-l-2 pl-3' : 'hidden'}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.link} className={`text-sm`}>
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );

    const menuItems = {
      'étudiant': [
        {
          icon: <FaGraduationCap />,
          title: 'Stage',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stages' },
            { link: '/demandes', title: 'Demandes' }
          ]
        },
        {
          icon: <IoDocumentText />,
          title: 'Documents',
          link: '/documents'
        },
        {
          icon: <IoMail />,
          title: 'Message',
          link: '/chat'
        }
      ],
      'entreprise': [
        {
          icon: <FaGraduationCap />,
          title: 'Stage',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stages' },
            { link: '/demandes', title: 'Demandes' }
          ]
        }
      ],
      'responsable pédagogique': [
        {
          icon: <FaGraduationCap />,
          title: 'Stagiaires',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stagiaires' }
          ]
        },
        {
          icon: <IoDocumentText />,
          title: 'Documents',
          link: '/documents'
        },
        {
          icon: <IoMail />,
          title: 'Message',
          link: '/chat'
        }
      ]
    };

    if (storedRole) {
      setRole(generateMenu(menuItems[storedRole]));
    }
  }, [dropdown, storedRole, location]);

  return (
    <section className="flex flex-col w-full gap-4 text-gray-800 h-full">
      <div className="flex justify-between items-center py-6 px-5 w-full">
        <img src={images.ISFOLogoBlack} className="w-28" alt="Logo" />
        <button className="size-6 bg-white rounded-lg flex justify-center items-center shadow-lg">
          <LuChevronFirst className="text-xl font-semibold" />
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full py-6 px-5 items-start justify-between h-4/5">
        {role}

        <div className="w-full mb-4">
          <Link to={`/profile`} className={`flex items-center gap-3 w-full px-2 py-2 bg-white relative`}>
            <img src={`images_cv/${User.img_url}`} className="size-10 rounded-full" alt="" />
            <div className="flex flex-col">
              <span className="text-sm">{User.nom}</span>
            </div>
            <IoMenu className="absolute right-2" />
          </Link>
        </div>
        <div className="w-full">
          <button onClick={isModalOpen ? handleCloseModal : handleOpenModal} className={`flex items-center gap-3 w-full px-2 py-2 transition-colors duration-200 ${isModalOpen ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'}`}>
            <FaGear />
            <span className="text-base">Settings</span>
          </button>
        </div>
        <div className="w-full">
          <Link to="/contact" className={`flex items-center gap-3 w-full px-2 py-2 transition-colors duration-200 ${location.pathname === '/contact' ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'}`}>
            <MdOutlineSupportAgent />
            <span className="text-base">Support</span>
          </Link>
        </div>
        <div className="w-full">
          <button onClick={Logout} className={`flex items-center gap-3 w-full px-2 py-2 text-red-600`}>
            <MdLogout />
            <span className="text-base">Log out</span>
          </button>
        </div>

      </div>
      {
        isModalOpen && (
          <Settings
            handleCloseModal={handleCloseModal}
          />
        )
      }
    </section>
  );
};

export default UserSidebar;
