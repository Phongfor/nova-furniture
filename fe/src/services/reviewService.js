import axiosClient from './axiosClient';

const reviewService = {
    // GET /reviews/product/{productId}
    getReviewsByProduct: (productId, params = {}) =>
        axiosClient.get(`/reviews/product/${productId}`, { params }),

    // GET /reviews/product/{productId}/rating
    getRatingByProduct: (productId) =>
        axiosClient.get(`/reviews/product/${productId}/rating`),

    // POST /reviews
    createReview: (data) =>
        axiosClient.post('/reviews', data),

    // PUT /reviews/{reviewId}
    updateReview: (reviewId, data) =>
        axiosClient.put(`/reviews/${reviewId}`, data),

    // DELETE /reviews/{reviewId}
    deleteReview: (reviewId) =>
        axiosClient.delete(`/reviews/${reviewId}`)
};

export default reviewService;