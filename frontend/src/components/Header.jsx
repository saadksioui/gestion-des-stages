import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { images } from "../constants";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemsInfo = [
    {
      name: "Accueil",
      linkto: 'accueil'
    },
    {
      name: "Caractéristiques",
      linkto: 'caracteristiques'
    },
    {
      name: "Testimonial",
      linkto: 'testimontial'
    },
    {
      name: "Contact us",
      linkto: 'contact-us'
    }
  ];

  return (
    <section>
      <div className="w-11/12 lg:w-3/4 h-20 lg:h-40 mx-auto flex justify-between items-center py-2 lg:py-0">
        <div>
          <img src={images.BlackLogo} className="w-40 lg:w-56 h-20 lg:h-24" alt="Logo" />
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            <FaBars />
          </button>
        </div>
        <div className={`flex-col lg:flex-row lg:flex ${isOpen ? "flex" : "hidden"} lg:items-center gap-10 absolute lg:static bg-white top-20 left-0 w-full lg:w-auto lg:bg-transparent p-5 lg:p-0 shadow-lg lg:shadow-none`}>
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-5 lg:gap-20">
            {navItemsInfo.map((item, index) => (
              <LinkScroll
                key={index}
                to={item.linkto}
                spy={true}
                smooth={true}
                offset={-10}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="font-medium cursor-pointer hover:font-semibold"
              >
                <li>{item.name}</li>
              </LinkScroll>
            ))}
          </ul>
          <Link to={'/login'} className="lg:hidden">
            <div className="text-black font-semibold p-3 rounded-xl border-black border-2 hover:bg-black hover:text-white duration-150 mt-5 text-center lg:mt-0">
              Commencer
            </div>
          </Link>
        </div>
        <Link to={'/login'} className="hidden lg:block">
          <div className="text-black font-semibold p-3 rounded-xl border-black border-2 hover:bg-black hover:text-white duration-150 mt-5 text-center lg:mt-0">
            Commencer
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Header;
