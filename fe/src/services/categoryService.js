// services/categoryService.js
import axiosClient from './axiosClient';

const categoryService = {
    getCategories: () => axiosClient.get('/categories')
};

export default categoryService;