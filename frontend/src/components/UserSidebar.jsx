import { useEffect, useState } from "react";
import { icons, images } from "../constants";
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { LuChevronFirst } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa6";
import { IoDocumentText, IoMail } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

const UserSidebar = () => {
  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData ? storedData.split(",")[2] : '';

  const [dropdown, setDropDown] = useState(false);
  const [role, setRole] = useState();
  const location = useLocation();

  useEffect(() => {
    const generateMenu = (menuItems) => (
      <div className="flex flex-col w-full py-6 px-5 items-start justify-between h-4/5 bg-gray-100">
        <div className="flex-1 w-full">
          <ul className="flex flex-col items-start gap-5 mt-10 w-full">
            {menuItems.map((item, index) => (
              <li key={index} className="flex flex-col items-center justify-between w-full">
                <div className="flex items-center justify-between w-full">
                  <div className={`flex items-center gap-3 px-2 py-2 w-full transition-colors duration-200 ${location.pathname === item.link ? 'text-black bg-white rounded-lg shadow-lg' : 'text-gray-500 hover:text-gray-700'} `}>
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
                  <ul className={`${dropdown ? 'flex flex-col items-start gap-2 mt-2' : 'hidden'}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link} className={`text-sm ${location.pathname === subItem.link ? 'text-black bg-white rounded-lg px-2' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}>
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
        <div>
          <Link to="/contact" className={`flex items-center gap-3 w transition-colors duration-200 ${location.pathname === '/contact' ? 'text-black bg-white rounded-lg shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
            <MdOutlineSupportAgent />
            <span className="text-base">Support</span>
          </Link>
        </div>
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
      {role}
    </section>
  );
};

export default UserSidebar;
