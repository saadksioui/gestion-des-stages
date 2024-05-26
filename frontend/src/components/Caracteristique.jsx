const Caracteristique = (props) => {
  return (
    <div className="flex flex-col items-start gap-4 p-4 rounded-lg">
      <div className={`w-[59px] h-[59px] rounded-full ${props.bgColor} flex items-center justify-center`}>
        <img src={props.img} alt="" />
      </div>
      <h1 className="text-xl lg:text-2xl font-semibold">{props.title}</h1>
      <p className="text-base lg:text-lg font-medium text-[#6A6A6A]">{props.description}</p>
    </div>
  );
};

export default Caracteristique;