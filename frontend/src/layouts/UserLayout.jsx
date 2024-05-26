import { useEffect, useRef } from "react";
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
      <div className="w-[17%] h-screen">
        <UserSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-[83%] h-screen">

        {/* Content */}
        <div className="h-full" ref={containerRef}>
          {children}
        </div>
      </div>
    </div>

  )
};

export default UserLayout
