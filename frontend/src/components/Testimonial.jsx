import { images } from "../constants";

const Testimonial = (props) => {
  return (
    <article className={`w-3/4 mx-auto flex items-center gap-16 ${props.position}`}>
      <div>
        <img src={props.pfp} className="size-80" alt="" />
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-white">{props.testimony}</p>
        <div>
          <p className="text-white font-semibold">{props.name}</p>
          <p className="text-white">{props.jobTitle}</p>
        </div>
      </div>
    </article>
  )
};

export default Testimonial
