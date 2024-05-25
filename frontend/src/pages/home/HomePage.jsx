import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout"
import Accueil from "./container/Accueil";
import Caracteristiques from "./container/Caracteristiques";
import Testimonials from "./container/Testimonials";
import { FaArrowUp } from "react-icons/fa6";
import ContactUs from "./container/ContactUs";
const HomePage = () => {

  const [backToTop, setBackToTop] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true)
      } else {
        setBackToTop(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }



  return (
    <DefaultLayout>
      <Accueil />
      <Caracteristiques />
      <Testimonials />
      <ContactUs />
      {
        backToTop && <button onClick={scrollUp} className="fixed bottom-12 bg-[#1B1B1B] size-12 rounded-lg flex items-center justify-center right-12">
          <FaArrowUp className="text-2xl text-white" />
        </button>
      }
    </DefaultLayout>
  )
};

export default HomePage
