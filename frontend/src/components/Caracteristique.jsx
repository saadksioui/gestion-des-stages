const Caracteristique = (props) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className={`size-[59px] rounded-full ${props.bgColor} flex items-center justify-center gap-10`}>
        <img src={props.img} alt="" />
      </div>
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      <p className="font-medium text-[#6A6A6A]">{props.description}</p>
    </div>
  )
};

export default Caracteristique
