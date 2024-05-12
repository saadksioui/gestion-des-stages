import { useEffect, useRef } from "react";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const UserLayout = ({ children }) => {
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
      {/* Sidebar */}
      <div className="w-1/5 h-screen">
        <UserSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-4/5 h-screen">
        {/* Navbar */}
        <div className="h-[129px] border-black border-b-[1px]">
          <UserNavbar />
        </div>

        {/* Content */}
        <div className="h-[calc(100%-129px)]" ref={containerRef}>
          {children}
        </div>
      </div>
    </div>

  )
};

export default UserLayout
