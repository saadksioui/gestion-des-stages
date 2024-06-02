import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaGear, FaGraduationCap } from "react-icons/fa6";
import { IoBusiness, IoDocumentText, IoMail, IoMenu } from "react-icons/io5";
import { images } from "../constants";
import { LuMoreVertical } from "react-icons/lu";
import { MdLogout, MdOutlineSupportAgent, MdSupervisorAccount } from "react-icons/md";
import axios from "axios";
import Settings from "../components/Settings";
import { FaBars } from "react-icons/fa";

const UserLayout = ({ children }) => {
  const [dropdown, setDropDown] = useState(false);
  const [role, setRole] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [User, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData ? storedData.split(",")[2] : '';
  const storedId = storedData ? storedData.split(",")[1] : '';

  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }
  }, [children]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(User);

  useEffect(() => {
    const generateMenu = (menuItems) => (
      <div className="flex-1 w-full">
        <ul className="flex flex-col items-start gap-5 my-10 w-full font-medium">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col items-center justify-between w-full">
              <div className={`flex items-center justify-between pr-5 w-full transition-colors duration-200 ${location.pathname === item.link || item.submenu && item.submenu.some(sub => location.pathname === sub.link) ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'}`}>
                <Link to={item.link || "#"} className={`flex items-center gap-3 px-2 py-2 w-full  `}>
                  <div className={`text-2xl`}>
                    {item.icon}
                  </div>
                  {item.title}
                </Link>
                {item.submenu && (
                  <button className={`text-base`} onClick={() => setDropDown(!dropdown)}>
                    <IoIosArrowDown className={`${dropdown ? 'transform rotate-180 duration-300' : 'transform rotate-0 duration-300'}`} />
                  </button>
                )}
              </div>
              {item.submenu && (
                <ul className={`${dropdown ? 'flex flex-col items-start gap-2 mt-2' : 'hidden'}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.link} className={`text-base`}>
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
      ],
      'admin': [
        {
          icon: <FaGraduationCap />,
          title: 'Liste des stagiaires',
          link: '/admin/liste-des-stagiaires'
        },
        {
          icon: <MdSupervisorAccount />,
          title: 'Liste des responsables',
          link: '/admin/liste-des-responsables'
        },
        {
          icon: <IoBusiness />,
          title: 'Liste des entreprise',
          link: '/admin/liste-des-entrprises'
        },

      ]
    };

    if (storedRole) {
      setRole(generateMenu(menuItems[storedRole]));
    }
  }, [dropdown, storedRole, location]);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row font-poppins">
      {/* Burger Icon for Mobile */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-white shadow-sm">
        <img src={images.ISFOLogoBlack} className="w-28" alt="Logo" />
        <button onClick={toggleSidebar} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed lg:relative top-0 left-0 w-full lg:w-[17%] h-full lg:h-auto bg-white z-50 lg:z-auto lg:flex lg:flex-col shadow-sm duration-300 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        {/* Logo */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={images.ISFOLogoBlack}
            className={`overflow-hidden transition-all w-28`}
            alt=""
          />
          <button onClick={toggleSidebar} className="lg:hidden text-2xl">
            <IoMenu />
          </button>
        </div>
        {/* Menu */}
        <ul className="flex-1 px-3">
          {role}
        </ul>
        {/* Settings Links */}
        <div className="flex-1 px-3 flex flex-col items-start gap-5 font-medium">
          <div className="w-full">
            <button onClick={isModalOpen ? handleCloseModal : handleOpenModal} className={`flex items-center gap-3 w-full px-2 py-2 transition-colors duration-200 ${isModalOpen ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'}`}>
              <div className={`text-2xl`}>
                <FaGear />
              </div>
              <span className={`text-base`}>Settings</span>
            </button>
          </div>
          <div className="w-full">
            <Link to="/contact" className={`flex items-center gap-3 w-full px-2 py-2 transition-colors duration-200 ${location.pathname === '/contact' ? 'text-white bg-black rounded-lg shadow-lg' : 'text-black hover:text-gray-900'}`}>
              <div className={`text-2xl`}>
                <MdOutlineSupportAgent />
              </div>
              <span className={`text-base`}>Support</span>
            </Link>
          </div>
          <div className="w-full">
            <button onClick={Logout} className={`flex items-center gap-3 w-full px-2 py-2 text-red-600`}>
              <div className={`text-2xl`}>
                <MdLogout />
              </div>
              <span className={`text-base`}>Log out</span>
            </button>
          </div>
        </div>
        {/* User Info */}
        <Link to={'/profile'} className="w-full">
          <div className={`border-t flex p-3 w-full mt-10 lg:mt-0`}>
            <img
              src={`images_cv/${User.img_url}`}
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center w-full lg:w-52 ml-3`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{User.nom}</h4>
                <span className="text-xs text-gray-600">{User.email}</span>
              </div>
              <LuMoreVertical size={20} />
            </div>
          </div>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="border-[0.5px] border-gray-100 h-full w-[1px] hidden lg:block"></div>

      <div className={`h-full w-full lg:w-[83%] ${isModalOpen && 'opacity-30'}`} ref={containerRef}>
        {children}
      </div>
      {
        isModalOpen && (
          <Settings
            handleCloseModal={handleCloseModal}
          />
        )
      }

    </div>
  );
};

export default UserLayout;
