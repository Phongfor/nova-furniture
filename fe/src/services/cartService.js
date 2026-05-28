import axiosClient from './axiosClient';

const cartService = {
    // GET /cart
    getCart: () => axiosClient.get('/cart'),

    // POST /cart/items
    addToCart: (productId, quantity = 1) =>
        axiosClient.post('/cart/items', { productId, quantity }),

    // PUT /cart/items/{cartItemId}
    updateQuantity: (cartItemId, quantity) =>
        axiosClient.put(`/cart/items/${cartItemId}`, { quantity }),

    // DELETE /cart/items/{cartItemId}
    removeItem: (cartItemId) =>
        axiosClient.delete(`/cart/items/${cartItemId}`),

    // DELETE /cart
    clearCart: () => axiosClient.delete('/cart'),

};

export default cartService;