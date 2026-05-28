// contexts/SidebarProvider.jsx
import {
    createContext,
    useState,
    useCallback,
    useEffect,
    useContext
} from 'react';

import cartService from '../services/cartService';
import wishlistService from '../services/wishlistService';
import { AuthContext } from './AuthProvider';

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
    const { user } = useContext(AuthContext);

    // Sidebar state
    const [sidebarType, setSidebarType] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Wishlist
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // Cart
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartLoading, setCartLoading] = useState(false);

    // =========================
    // CART
    // =========================

    const syncCart = (result) => {
        setCartItems(result?.items ?? []);
        setTotalItems(result?.totalItems ?? 0);
        setTotalPrice(result?.totalPrice ?? 0);
    };

    // Fetch cart
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

    // Add to cart
    const addToCart = async (productId, quantity = 1) => {
        try {
            const res = await cartService.addToCart(productId, quantity);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to add to cart:', err);
            throw err;
        }
    };

    // Update quantity
    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const res = await cartService.updateQuantity(cartItemId, quantity);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to update quantity:', err);
        }
    };

    // Remove item
    const removeItem = async (cartItemId) => {
        try {
            const res = await cartService.removeItem(cartItemId);
            syncCart(res.data.result);
        } catch (err) {
            console.error('Failed to remove item:', err);
        }
    };

    // Clear cart
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

    // Place order
    const placeOrder = async () => {
        try {
            const res = await cartService.placeOrder();

            await clearCart();

            return res.data.result;
        } catch (err) {
            throw err;
        }
    };

    // =========================
    // WISHLIST
    // =========================

    // Fetch wishlist
    const fetchWishlist = useCallback(async () => {
        if (!user) {
            setWishlistItems([]);
            return;
        }

        setWishlistLoading(true);

        try {
            const res = await wishlistService.getMyWishlist();

            setWishlistItems(
                Array.isArray(res.data.result?.content)
                    ? res.data.result.content
                    : []
            );
        } catch (err) {
            console.error('Failed to fetch wishlist:', err);
            setWishlistItems([]);
        } finally {
            setWishlistLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    // Toggle wishlist
    const toggleWishlist = async (productId) => {
        try {
            await wishlistService.toggleWishlist(productId);

            setWishlistItems((prev) => {
                const exists = prev.some((item) => item.id === productId);

                // Remove
                if (exists) {
                    return prev.filter((item) => item.id !== productId);
                }

                // Refetch để lấy full product data
                fetchWishlist();

                return prev;
            });
        } catch (err) {
            console.error('Failed to toggle wishlist:', err);
        }
    };

    // Check wishlist
    const isWishlisted = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    // =========================
    // SIDEBAR
    // =========================

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
                // Sidebar
                sidebarType,
                isOpen,
                openSidebar,
                closeSidebar,

                // Cart
                cartItems,
                totalItems,
                totalPrice,
                cartLoading,
                fetchCart,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                placeOrder,

                // Wishlist
                wishlistItems,
                wishlistLoading,
                fetchWishlist,
                toggleWishlist,
                isWishlisted
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
