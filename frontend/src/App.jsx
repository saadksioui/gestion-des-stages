import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ListeStage from "./pages/Stagiaire/ListeStage";
import EntrepriseForm from "./components/EntrepriseForm";
import Chat from "./pages/chat/Stagiaires/Chat";
import ChatR from "./pages/chat//Responsable/Chat";
import Contact from "./components/Contact";
import StagiaireForm from "./components/StagiaireForm";
import Demandes from "./pages/Stagiaire/Demandes";
import Documents from "./pages/Stagiaire/Documents";
import Profile from "./pages/Stagiaire/Profile";
import VerifyStg from "./components/VerifyStg";
import ListeStagiaires from "./pages/Responsable/ListeStagiaires";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/liste-stages" element={<ListeStage />} />
          <Route path="/demandes" element={<Demandes />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/liste-stagaires" element={<ListeStagiaires />} />
          <Route path="/entreprise-form" element={<EntrepriseForm />} />
          <Route path="/stagaire-form" element={<StagiaireForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatR" element={<ChatR />} />
          <Route path="/verifystg" element={<VerifyStg />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};

export default App
