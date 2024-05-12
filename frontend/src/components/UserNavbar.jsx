import { icons, images } from "../constants";

const UserNavbar = () => {
  return (
    <section className="px-10 flex items-center justify-end h-full">
      <div className="flex items-center gap-10">
        <div>
          <a href="#">
            <img src={icons.Logout} alt="" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={images.Pfp1} className="size-12 object-cover rounded-full" alt="" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={icons.Settings} alt="" />
          </a>
        </div>

      </div>
    </section>
  )
};

export default UserNavbar
