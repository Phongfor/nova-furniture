import axiosClient from './axiosClient';

const adminDashboardService = {
    getSummary: () =>
        axiosClient.get('/admin/dashboard/summary').then((r) => r.data.result),

    getRevenueMonthly: () =>
        axiosClient.get('/admin/dashboard/revenue/monthly').then((r) => r.data.result),

    getRevenueDaily: () =>
        axiosClient.get('/admin/dashboard/revenue/daily').then((r) => r.data.result),

    getOrderStats: () =>
        axiosClient.get('/admin/dashboard/orders/stats').then((r) => r.data.result),

    getTopSellingProducts: (limit = 5) =>
        axiosClient
            .get('/admin/dashboard/products/top-selling', { params: { limit } })
            .then((r) => r.data.result),

    getRecentUsers: (limit = 6) =>
        axiosClient
            .get('/admin/dashboard/users/recent', { params: { limit } })
            .then((r) => r.data.result),
};

export default adminDashboardService;