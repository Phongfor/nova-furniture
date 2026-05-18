import { createContext, useState } from 'react';

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
    const [sidebarType, setSidebarType] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const openSidebar = (type) => {
        setSidebarType(type);
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <SidebarContext.Provider
            value={{
                sidebarType,
                isOpen,

                cartItems,
                setCartItems,

                wishlistItems,
                setWishlistItems,

                loading,
                setLoading,

                openSidebar,
                closeSidebar
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
