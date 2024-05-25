import { images } from "../constants";

const Testimonial = (props) => {
  return (
    <article className={`w-11/12 lg:w-3/4 mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-16 ${props.position}`}>
      <div className="flex-shrink-0">
        <img src={props.pfp} className="w-20 h-20 lg:w-32 lg:h-32 rounded-full object-cover" alt="Profile" />
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 text-center lg:text-left">
        <p className="text-white text-sm lg:text-base">{props.testimony}</p>
        <div>
          <p className="text-white font-semibold text-sm lg:text-base">{props.name}</p>
          <p className="text-white text-sm lg:text-base">{props.jobTitle}</p>
        </div>
      </div>
    </article>
  );
};

export default Testimonial;
