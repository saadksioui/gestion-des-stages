import { useEffect, useState } from "react";
import { icons, images } from "../constants";
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronCircleLeft } from "react-icons/fa";

const UserSidebar = () => {
  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData.split(",")[2];

  const [dropdown, setDropDown] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    const generateMenu = (menuItems) => (
      <div className="flex flex-col w-3/4 mx-auto items-start justify-between h-3/5">
        <div className="flex-1 w-full">
          <ul className="flex flex-col items-start gap-5 mt-10 w-full">
            {menuItems.map((item, index) => (
              <li key={index} className={`flex flex-col items-center justify-between w-full`}>
                <div className={`flex items-center justify-between w-full`}>
                  <div className="flex items-center gap-3">
                    <img src={item.icon} alt="" className="w-6 h-6" />
                    <span className="text-base">{item.title}</span>
                  </div>
                  {item.submenu && (
                    <button onClick={() => setDropDown(!dropdown)}>
                      <IoIosArrowDown className={`${dropdown ? 'transform rotate-180 duration-300' : 'transform rotate-0 duration-300'}`} alt="" />
                    </button>
                  )}
                </div>
                {item.submenu && (
                  <ul className={`${dropdown ? 'flex flex-col items-start gap-2 mt-2' : 'hidden'}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link} className="text-sm hover:text-gray-700">
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
          <Link to="/contact" className={`flex items-center gap-3`}>
            <img src={icons.Support} alt="" className="w-6 h-6" />
            <span className="text-base">Support</span>
          </Link>
        </div>
      </div>
    );

    const menuItems = {
      'étudiant': [
        {
          icon: icons.GraduationCap,
          title: 'Stage',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stages' },
            { link: '/demandes', title: 'Demandes' }
          ]
        },
        {
          icon: icons.File,
          title: 'Documents',
          link: '/documents'
        },
        {
          icon: icons.Mail,
          title: 'Message',
          link: '/chat'
        }
      ],
      'entreprise': [
        {
          icon: icons.GraduationCap,
          title: 'Stage',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stages' },
            { link: '/demandes', title: 'Demandes' }
          ]
        }
      ],
      'responsable pédagogique': [
        {
          icon: icons.GraduationCap,
          title: 'Stagiaires',
          submenu: [
            { link: '/liste-stages', title: 'Liste des stagiaires' }
          ]
        },
        {
          icon: icons.File,
          title: 'Documents',
          link: '/documents'
        },
        {
          icon: icons.Mail,
          title: 'Message',
          link: '/chat'
        }
      ]
    };

    setRole(generateMenu(menuItems[storedRole]));
  }, [dropdown, storedRole]);

  return (
    <section className="flex flex-col w-full gap-4 text-gray-800 h-full">
      <div className="flex justify-between items-center h-1/5 mb-10 mx-5">
        <img src={images.BlackLogo} className="w-32" alt="Logo" />
        <button>
          <FaChevronCircleLeft className="text-2xl" />
        </button>
      </div>
      {role}
    </section>
  );
};

export default UserSidebar;
