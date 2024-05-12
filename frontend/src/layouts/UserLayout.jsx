import { useEffect, useRef } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const UserLayout = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const childrenHeight = containerRef.current.scrollHeight;
    if (childrenHeight > containerHeight) {
      containerRef.current.classList.add('overflow-y-scroll');
    } else {
      containerRef.current.classList.remove('overflow-y-scroll');
    }
  }, [children]);
  
  return (
    <div className="flex font-poppins">
      <div className="w-1/5 h-screen border-[#A6A6AA] border-r-2">
        <UserSidebar />
      </div>
      <div className="flex flex-col w-4/5 h-screen">
        <div className="h-1/5 border-[#A6A6AA] border-b-2">
          <UserNavbar />
        </div>
        <div className="h-4/5" ref={containerRef}>
          {children}
        </div>
      </div>
    </div>
  )
};

export default UserLayout
