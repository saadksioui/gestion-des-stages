import DefaultLayout from "../../layouts/DefaultLayout"
import Accueil from "./container/Accueil";
import Caracteristiques from "./container/Caracteristiques";
import Testimonials from "./container/Testimonials";
const HomePage = () => {
  return (
    <DefaultLayout>
      <Accueil/>
      <Caracteristiques/>
      <Testimonials/>
    </DefaultLayout>
  )
};

export default HomePage
