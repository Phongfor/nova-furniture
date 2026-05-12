package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.CategoryRequest;
import com.novafurniture.NovaFurniture.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategoryById(Long id);
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}