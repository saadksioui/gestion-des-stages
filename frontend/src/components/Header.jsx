import { Link } from "react-router-dom";
import { images } from "../constants";

const Header = () => {
  const navItemsInfo = [
    {
      name: "Accueil",
      linkto: '/'
    },
    {
      name: "Caractéristiques",
      linkto: '#AboutUs'
    },
    {
      name: "Testimonial",
      linkto: '#ContactUs'
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
                <Link><li key={index} className="text-white font-medium hover:font-semibold">{item.name}</li></Link>
              ))
            }
          </ul>
        </div>
        <Link to={'/register'}>
          <div className="text-white font-semibold p-3 rounded-xl border-white border-2 hover:bg-white hover:text-black duration-150">
            Commencer
          </div>
        </Link>
      </div>
    </section>
  )
};

export default Header
