import "./App.css";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./components/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
