import DefaultLayout from "../../layouts/DefaultLayout"
import Accueil from "./container/Accueil";
import Caracteristiques from "./container/Caracteristiques";
const HomePage = () => {
  return (
    <DefaultLayout>
      <Accueil/>
      <Caracteristiques/>
    </DefaultLayout>
  )
};

export default HomePage
