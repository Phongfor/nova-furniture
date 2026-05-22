// services/orderService.js
import axiosClient from './axiosClient';

const orderService = {
    // POST /orders
    placeOrder: (data) => axiosClient.post('/orders', data),

    // POST /payments/vnpay/create/{orderId}
    createVNPayUrl: (orderId) =>
        axiosClient.post(`/payments/vnpay/create/${orderId}`),

    // GET /payments/order/{orderId}
    getPaymentStatus: (orderId) =>
        axiosClient.get(`/payments/order/${orderId}`),

    // GET /orders/my
    getMyOrders: (params = {}) =>
        axiosClient.get('/orders/my', { params }),

    // GET /orders/{orderId}
    getOrderById: (orderId) =>
        axiosClient.get(`/orders/${orderId}`)
};

export default orderService;