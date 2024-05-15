import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { images } from "../constants";

const Header = () => {
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
    }
  ]

  return (
    <section className="bg-black">
      <div className="w-3/4 h-40 mx-auto flex justify-between items-center">
        <div>
          <img src={images.Logo} className="w-56 h-24" alt="" />
        </div>
        <div>
          <ul className="flex items-center gap-20">
            {
              navItemsInfo.map((item, index) => (
                <LinkScroll
                to={item.linkto}
                spy={true}
                smooth={true}
                offset={-10}
                duration={500}
                >
                  <li
                    key={index}
                    className="text-white font-medium cursor-pointer hover:font-semibold"
                  >
                    {item.name}
                  </li>
                </LinkScroll>
              ))
            }
          </ul>
        </div>
        <Link to={'/login'}>
          <div className="text-white font-semibold p-3 rounded-xl border-white border-2 hover:bg-white hover:text-black duration-150">
            Commencer
          </div>
        </Link>
      </div>
    </section>
  )
};

export default Header
