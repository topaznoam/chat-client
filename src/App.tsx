import "./App.css";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Navigate to="/registration" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
