package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.ProductRequest;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.ProductResponse;

import java.math.BigDecimal;

public interface ProductService {
    PageResponse<ProductResponse> getAllProducts(
            String keyword,
            Long categoryId,
            Long brandId,
            String material,
            String color,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            int page,
            int size,
            String sortBy,
            String sortDir
    );
    ProductResponse getProductById(Long id);
    ProductResponse getProductBySlug(String slug);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
}