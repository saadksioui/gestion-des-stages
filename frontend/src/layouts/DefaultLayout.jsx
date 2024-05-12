import Footer from "../components/Footer";
import Header from "../components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="font-poppins">
      <Header />
      {children}
      <Footer />
    </div>
  )
};

export default DefaultLayout
