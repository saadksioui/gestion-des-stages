import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ContactUsPage from "./components/Contact";
import ListeStage from "./pages/user/ListeStage";
import EntrepriseForm from "./components/EntrepriseForm";
import Chat from "./pages/chat/Chat";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/liste-stages" element={<ListeStage />} />
          <Route path="/Form" element={<EntrepriseForm />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};

export default App
