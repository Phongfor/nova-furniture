import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/client/HomePage/HomePage";
import AuthPage from "../pages/client/AuthPage/AuthPage";
import CollectionsPage from "../pages/client/Collectionspage/Collectionspage"; 
import ProductDetailPage from "../pages/client/ProductDetailPage/ProductDetailPage"; 



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
    </Routes>
  );
}