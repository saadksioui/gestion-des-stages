import { useEffect, useState } from "react";
import Testimonial from "../../../components/Testimonial";
import { icons, images } from "../../../constants";
import { TestimonialsData } from "../../../data/Testimonials";

const Testimonials = () => {
  const [people] = useState(TestimonialsData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section id="testimontial" className="w-11/12 lg:w-3/4 mx-auto my-10">
      <h1 className="text-3xl lg:text-5xl font-semibold mb-10 text-center lg:text-left">
        Les témoignages sur notre service
      </h1>
      <div
        id="testimontialFrame"
        className="relative h-[300px] lg:h-[441px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${images.TestimFrame})` }}
      >
        <div className="w-full h-full flex justify-center items-center overflow-hidden relative">
          {people.map((person, indexPeople) => {
            const { profileImg, name, jobTitle, testimony } = person;
            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (indexPeople === index - 1 || (index === 0 && indexPeople === people.length - 1)) {
              position = "lastSlide";
            }
            return (
              <Testimonial
                key={indexPeople}
                position={position}
                pfp={profileImg}
                name={name}
                jobTitle={jobTitle}
                testimony={testimony}
              />
            );
          })}
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 flex items-center gap-3 lg:gap-6">
          <div className="w-8 h-8 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center">
            <button onClick={() => setIndex(index - 1)}>
              <img src={icons.ArrowBlack} className="" alt="Previous" />
            </button>
          </div>
          <div className="w-8 h-8 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center">
            <button onClick={() => setIndex(index + 1)}>
              <img src={icons.ArrowBlack} className="rotate-180" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
