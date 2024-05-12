import Footer from "../components/Footer";
import Header from "../components/Header";

const DefaultLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
};

export default DefaultLayout
