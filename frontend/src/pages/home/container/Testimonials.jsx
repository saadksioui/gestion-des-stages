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
    <section id="testimontial" className="w-3/4 mx-auto my-10">
      <h1 className="text-5xl font-semibold mb-10 w-[513px]">Les témoignages sur notre service</h1>
      <div id="testimontialFrame" className="relative h-[441px] bg-[url(${images.TestimFrame})]">
        <div className="flex justify-center items-center h-full">
        {people.map((person, indexPeople) => {
            const { profileImg, name, jobTitle, testimony } = person;
            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (indexPeople === index - 1 || (index === 0 && indexPeople === people.length - 1)) {
              position = "lastSlide";
            }
            return <Testimonial key={indexPeople} position={position} pfp={profileImg} name={name} jobTitle={jobTitle} testimony={testimony} />;
          })}
        </div>
        <div className="absolute bottom-10 right-10 flex items-center gap-6">
          <div className="size-14 bg-white rounded-full flex items-center justify-center">
            <button onClick={()=>setIndex(index - 1)}>
              <img src={icons.ArrowBlack} className="" alt="" />
            </button>
          </div>
          <div className="size-14 bg-white rounded-full flex items-center justify-center">
            <button onClick={()=>setIndex(index + 1)}>
              <img src={icons.ArrowBlack} className="rotate-180" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
