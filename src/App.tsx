import ChatPage from "./components/ChatPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import SignUpPage from "./components/signup";
import CreateGroupPage from "./components/CreateGroupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/creategroup" element={<CreateGroupPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
