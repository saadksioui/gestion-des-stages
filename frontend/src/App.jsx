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
import ListeStgs from "./pages/admin/ListeStgs";
import ListeResps from "./pages/admin/ListeResps";
import ListeErps from "./pages/admin/ListeErps";
import AddResp from "./components/AdminForms/AddResp";



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
          <Route path="/admin/liste-des-stagiaires" element={<ListeStgs />} />
          <Route path="/admin/liste-des-responsables" element={<ListeResps />} />
          <Route path="/admin/liste-des-entrprises" element={<ListeErps />} />
          <Route path="/admin/addResp" element={<AddResp />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};

export default App
