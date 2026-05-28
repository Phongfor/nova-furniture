// services/productService.js
import axiosClient from './axiosClient';

const productService = {
    // GET /products - lấy danh sách có filter + phân trang
    getProducts: (params = {}) => {
        return axiosClient.get('/products', { params });
    },

    // GET /products/{id}
    getProductById: (id) => {
        return axiosClient.get(`/products/${id}`);
    },

    // GET /products/slug/{slug}
    getProductBySlug: (slug) => {
        return axiosClient.get(`/products/slug/${slug}`);
    }
};

export default productService;