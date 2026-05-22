import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/client/HomePage/HomePage';
import AuthPage from '../pages/client/AuthPage/AuthPage';
import CollectionsPage from '../pages/client/Collectionspage/Collectionspage';
import ProductDetailPage from '../pages/client/ProductDetailPage/ProductDetailPage';
import CartPage from '../pages/client/CartPage/CartPage';
import CheckoutPage from '../pages/client/CheckoutPage/CheckoutPage';
import PaymentCallback from '../pages/client/PaymentCallback/PaymentCallback';
import JournalPage from '../pages/client/JournalPage/JournalPage';
import OurStoryPage from '../pages/client/OurStoryPage/OurStoryPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/collections' element={<CollectionsPage />} />
            <Route path='/products/:slug' element={<ProductDetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/payment/callback' element={<PaymentCallback />} />
            <Route path='/journal' element={<JournalPage />} />
            <Route path='/our-story' element={<OurStoryPage />} />
        </Routes>
    );
}
