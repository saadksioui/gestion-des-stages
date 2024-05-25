import Caracteristique from "../../../components/Caracteristique";
import { CaracteristiqueData } from "../../../data/Caracteristique";

const Caracteristiques = () => {
  return (
    <section className="w-11/12 lg:w-3/4 mx-auto flex flex-col gap-10 px-5 py-5 mb-20" id="caracteristiques">
      <div className="flex flex-col gap-4 w-full lg:w-[614px]">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center lg:text-left">
          Qu'est-ce qui nous rend uniques ?
        </h1>
        <p className="text-lg lg:text-2xl font-medium text-[#6A6A6A] text-center lg:text-left">
          Utilisant les dernières technologies du marché, Nous facilitons grandement votre travail.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
        {CaracteristiqueData.map((item, index) => (
          <Caracteristique key={index} bgColor={item.bgColor} img={item.iconName} title={item.title} description={item.description}/>
        ))}
      </div>
    </section>
  );
};

export default Caracteristiques;