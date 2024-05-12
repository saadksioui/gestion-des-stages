import { Link } from "react-router-dom";
import { images } from "../../../constants";

const Accueil = () => {
  return (
    <section className="w-3/4 mx-auto flex items-center gap-3 px-5 py-5">
      <div className="w-1/2 flex flex-col items-start gap-7">
        <h1 className="text-5xl font-extralight">
          Facilitez votre parcours <span className="font-semibold">professionnel</span> avec notre application
          <span className="font-semibold"> de gestion des stages.</span>
        </h1>
        <p className="text-2xl font-light">E-stage la meilleur plateforme de gestion des stages.</p>
        <Link to={'/register'}>
          <div className="text-black font-semibold p-3 rounded-xl border-black border-2 hover:bg-black hover:text-white duration-150 w-fit">
            Commencer
          </div>
        </Link>
      </div>
      <div className="w-1/2">
        <img src={images.AccueilImg} alt="" />
      </div>

    </section>
  )
};

export default Accueil
