import Caracteristique from "../../../components/Caracteristique";
import { icons } from "../../../constants";
import { CaracteristiqueData } from "../../../data/Caracteristique";


const Caracteristiques = () => {

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 px-5 py-5">
      <div className="flex flex-col gap-4 w-[614px]">
        <h1 className="text-5xl font-semibold">Qu'est-ce qui nous rend uniques ?</h1>
        <p className="text-2xl font-medium text-[#6A6A6A]">Utilisant les dernières technologies du marché, Nous facilitons grandement votre travail.</p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {
          CaracteristiqueData.map((item, index) => (
            <Caracteristique key={index} bgColor={item.bgColor} img={item.iconName} title={item.title} description={item.description}/>
          ))
        }
      </div>
    </section>
  )
};

export default Caracteristiques
