import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ListeStage from "./pages/user/ListeStage";
import Chat from "./pages/chat/Chat";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/liste-stages" element={<ListeStage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
};

export default App
