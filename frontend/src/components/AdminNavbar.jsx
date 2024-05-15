import { Link } from "react-router-dom";
import { icons } from "../constants";
import axios from 'axios';
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const [User, setUser] = useState([]);
  const storedData = localStorage.getItem("sessionToken");
  let storedId;
  try {
    if (storedData) {
      storedId = storedData.split(",");
    }
  } catch (error) {
    console.error('Error parsing session token:', error);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/findById/${storedId[1]}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [storedId]);
  const Logout = () => {
    localStorage.removeItem("sessionToken");
    window.location.href = "http://localhost:5173/";
  };

  return (
    <section className="px-10 flex items-center justify-end h-full">
      <div className="flex justify-between items-center gap-10 w-full">
        <div>
          <h1 className="text-4xl font-semibold">Panneau d'administration</h1>
        </div>
        <div className="px-10 flex items-center justify-end h-full gap-10">
          <div>
          <button onClick={Logout}>
            <img src={icons.Logout} alt="" onClick={() => Logout} />
          </button>
        </div>
        <div>
          <Link to="/profileA">
            <img src={'images_cv/1.png'} className="size-12 object-cover rounded-full" alt="" />
          </Link>
        </div>
        </div>
        

      </div>

    </section>
  )
};

export default AdminNavbar
