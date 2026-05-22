// contexts/SidebarProvider.jsx
import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import cartService from '../services/cartService';
import { AuthContext } from './AuthProvider';

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
    const { user } = useContext(AuthContext);

    // Sidebar state
    const [sidebarType, setSidebarType] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Wishlist (local state)
    const [wishlistItems, setWishlistItems] = useState([]);

    // Cart (sync với API)
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartLoading, setCartLoading] = useState(false);

    const syncCart = (result) => {
        setCartItems(result?.items ?? []);
        setTotalItems(result?.totalItems ?? 0);
        setTotalPrice(result?.totalPrice ?? 0);
    };

    // Fetch cart khi user login
    const fetchCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            setTotalItems(0);
            setTotalPrice(0);
            return;
        }
        setCartLoading(true);
        try {
            const res = await cartService.getCart();
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        } finally {
            setCartLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Cart actions
    const addToCart = async (productId, quantity = 1) => {
        try {
            const res = await cartService.addToCart(productId, quantity);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to add to cart:', err);
            throw err;
        }
    };

    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const res = await cartService.updateQuantity(cartItemId, quantity);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to update quantity:', err);
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            const res = await cartService.removeItem(cartItemId);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to remove item:', err);
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCartItems([]);
            setTotalItems(0);
            setTotalPrice(0);
        } catch (err) {
            console.error('Failed to clear cart:', err);
        }
    };

    const placeOrder = async () => {
        try {
            const res = await cartService.placeOrder();
            await clearCart();
            return res.data.result;
        } catch (err) {
            throw err;
        }
    };

    // Sidebar actions
    const openSidebar = (type) => {
        setSidebarType(type);
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    // Wishlist actions
    const toggleWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.find((i) => i.id === product.id);
            if (exists) return prev.filter((i) => i.id !== product.id);
            return [...prev, product];
        });
    };

    const isWishlisted = (productId) =>
        wishlistItems.some((i) => i.id === productId);

    return (
        <SidebarContext.Provider
            value={{
                // Sidebar
                sidebarType, isOpen,
                openSidebar, closeSidebar,

                // Cart
                cartItems, totalItems, totalPrice, cartLoading,
                fetchCart, addToCart, updateQuantity,
                removeItem, clearCart, placeOrder,

                // Wishlist
                wishlistItems, setWishlistItems,
                toggleWishlist, isWishlisted
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}