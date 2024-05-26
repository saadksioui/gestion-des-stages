import { Link } from "react-router-dom";
import { images } from "../../../constants";

const Accueil = () => {
  return (
    <section className="w-11/12 lg:w-3/4 mx-auto flex flex-col lg:flex-row items-center gap-5 px-5 py-5 mb-20" id="accueil">
      <div className="w-full lg:w-1/2 flex flex-col items-start gap-7">
        <h1 className="text-3xl lg:text-5xl font-extralight text-center lg:text-left">
          Facilitez votre parcours <span className="font-semibold">professionnel</span> avec notre application
          <span className="font-semibold"> de gestion des stages.</span>
        </h1>
        <p className="text-xl lg:text-2xl font-light text-center lg:text-left">E-stage la meilleur plateforme de gestion des stages.</p>
        <Link to={'/register'} className="self-center lg:self-start">
          <div className="text-black font-semibold p-3 rounded-xl border-black border-2 hover:bg-black hover:text-white duration-150 w-fit">
            Commencer
          </div>
        </Link>
      </div>
      <div className="w-full lg:w-1/2">
        <img src={images.AccueilImg} alt="Accueil" className="mx-auto lg:mx-0" />
      </div>
    </section>
  );
};

export default Accueil;
