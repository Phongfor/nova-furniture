import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarProvider';
import CartSidebar from '../cart/CartSidebar';
import WishlistSidebar from '../wishlist/WishlistSidebar';

export default function SidebarContainer() {
    const { sidebarType, isOpen, closeSidebar } = useContext(SidebarContext);

    if (sidebarType === 'cart') {
        return <CartSidebar open={isOpen} onClose={closeSidebar} />;
    }

    if (sidebarType === 'wishlist') {
        return <WishlistSidebar open={isOpen} onClose={closeSidebar} />;
    }

    return null;
}