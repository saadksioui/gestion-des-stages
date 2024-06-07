import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import ProfileA from "./pages/admin/ProfileA";
import VerifyStg from "./components/VerifyStg";
import ListeStagiaires from "./pages/Responsable/ListeStagiaires";
import ListeStgs from "./pages/admin/ListeStgs";
import ListeResps from "./pages/admin/ListeResps";
import ListeErps from "./pages/admin/ListeErps";
import AddResp from "./components/AdminForms/AddResp";
import ListeStageE from "./pages/Entreprises/ListeStageE";
import DemandesE from "./pages/Entreprises/DemandesE";
import DocumentsR from "./pages/Responsable/DocumentsR";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const storedData = localStorage.getItem("sessionToken");
  const storedRole = storedData ? storedData.split(",")[2] : 'visiter';
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {storedRole !== 'admin' && storedRole !== 'entreprise' && storedRole !== 'étudiant' && storedRole !== 'responsable pédagogique' && (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

            </>
          )}

          {(storedRole === 'entreprise' ) && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/liste-stages" element={<ListeStageE />} />
              <Route path="/demandes" element={<DemandesE />} />
              <Route path="/contact" element={<Contact />} />

            </>
          )}
          {(storedRole === 'étudiant' ) && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/liste-stages" element={<ListeStage />} />
              <Route path="/demandes" element={<Demandes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/documents" element={<Documents />} />
            </>
          )}
          {(storedRole === 'responsable pédagogique' ) && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/liste-stages" element={<ListeStagiaires />} />
              <Route path="/documents" element={<DocumentsR />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<ChatR />} />

            </>
          )}
          {storedRole === 'admin' && (
            <>
              <Route path="/profile" element={<ProfileA />} />
              <Route path="/entreprise-form" element={<EntrepriseForm />} />
              <Route path="/stagaire-form" element={<StagiaireForm />} />
              <Route path="/verifystg" element={<VerifyStg />} />
              <Route path="/admin/liste-des-stagiaires" element={<ListeStgs />} />
              <Route path="/admin/liste-des-responsables" element={<ListeResps />} />
              <Route path="/admin/liste-des-entrprises" element={<ListeErps />} />
              <Route path="/admin/addResp" element={<AddResp />} />
            </>
          )}

          //todo : create NotFound page
          {/* <Route path='*' element={<Navigate to='/' />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
    </div>
  )
};

export default App
