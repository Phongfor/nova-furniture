import axiosClient from './axiosClient';

// ─── Products ────────────────────────────────────────────────────────────────
export const productAdminService = {
    getAll: (params) =>
        axiosClient.get('/products', { params }).then((r) => r.data.result),
    create: (data) =>
        axiosClient.post('/products', data).then((r) => r.data.result),
    update: (id, data) =>
        axiosClient.put(`/products/${id}`, data).then((r) => r.data.result),
    remove: (id) =>
        axiosClient.delete(`/products/${id}`).then((r) => r.data.result),
};

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orderAdminService = {
    getAll: (page = 0, size = 10) =>
        axiosClient.get('/orders', { params: { page, size } }).then((r) => r.data.result),
    updateStatus: (orderId, status) =>
        axiosClient.patch(`/orders/${orderId}/status`, { status }).then((r) => r.data.result),
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const userAdminService = {
    getAll: () =>
        axiosClient.get('/users').then((r) => r.data.result),
    getById: (id) =>
        axiosClient.get(`/users/${id}`).then((r) => r.data.result),
};

// ─── Categories ──────────────────────────────────────────────────────────────
export const categoryAdminService = {
    getAll: () =>
        axiosClient.get('/categories').then((r) => r.data.result),
    create: (data) =>
        axiosClient.post('/categories', data).then((r) => r.data.result),
    update: (id, data) =>
        axiosClient.put(`/categories/${id}`, data).then((r) => r.data.result),
    remove: (id) =>
        axiosClient.delete(`/categories/${id}`).then((r) => r.data.result),
};

// ─── Brands ──────────────────────────────────────────────────────────────────
export const brandAdminService = {
    getAll: () =>
        axiosClient.get('/brands').then((r) => r.data.result),
    create: (data) =>
        axiosClient.post('/brands', data).then((r) => r.data.result),
    update: (id, data) =>
        axiosClient.put(`/brands/${id}`, data).then((r) => r.data.result),
    remove: (id) =>
        axiosClient.delete(`/brands/${id}`).then((r) => r.data.result),
};