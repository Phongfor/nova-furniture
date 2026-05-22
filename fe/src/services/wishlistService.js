import axiosClient from './axiosClient';

const wishlistService = {

    // POST /wishlist/{productId}/toggle
    toggleWishlist: (productId) =>
        axiosClient.post(`/wishlist/${productId}/toggle`),

    // GET /wishlist
    getMyWishlist: (params = {}) =>
        axiosClient.get('/wishlist', { params }),

    // GET /wishlist/{productId}/check
    checkWishlist: (productId) =>
        axiosClient.get(`/wishlist/${productId}/check`)
};

export default wishlistService;