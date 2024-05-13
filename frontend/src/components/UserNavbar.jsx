import { icons, images } from "../constants";

const UserNavbar = () => {
  const Logout = () => {
    localStorage.removeItem("sessionToken");
    window.location.href = "http://localhost:5173/";
  };
  return (
    <section className="px-10 flex items-center justify-end h-full">
      <div className="flex items-center gap-10">
        <div>
          <button onClick={Logout}>
            <img src={icons.Logout} alt="" onClick={()=>Logout}/>
          </button>
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
