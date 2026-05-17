import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/client/HomePage/HomePage";
import AuthPage from "../pages/client/AuthPage/AuthPage";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth" element={<AuthPage />} />

    </Routes>
  );
}