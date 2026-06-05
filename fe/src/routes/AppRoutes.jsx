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
import OrderDetailPage from "../pages/client/OrderdetailPage/OrderdetailPage";
import OrdersPage from '../pages/client/OrdersPage/OrdersPage';
import AdminOverviewPage from '../pages/admin/AdminOverviewPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage/AdminProductsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage/AdminOrdersPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage/AdminUsersPage';

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
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/orders/:orderId' element={<OrderDetailPage />} />
            <Route path='/admin' element={<AdminOverviewPage />} />
            <Route path='/admin/products' element={<AdminProductsPage />} />
            <Route path='/admin/orders' element={<AdminOrdersPage />} />
            <Route path='/admin/users' element={<AdminUsersPage />} />
        </Routes>
    );
}
