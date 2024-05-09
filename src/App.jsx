import {  Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const navigate = useNavigate();
  return (
      <NextUIProvider navigate={navigate}>
        <main className="light">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </NextUIProvider>

  );
}

export default App;
