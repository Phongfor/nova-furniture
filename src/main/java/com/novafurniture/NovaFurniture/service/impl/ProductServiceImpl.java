package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.request.ProductRequest;
import com.novafurniture.NovaFurniture.dto.response.BrandResponse;
import com.novafurniture.NovaFurniture.dto.response.CategoryResponse;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.ProductResponse;
import com.novafurniture.NovaFurniture.entity.Brand;
import com.novafurniture.NovaFurniture.entity.Category;
import com.novafurniture.NovaFurniture.entity.Product;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.repository.BrandRepository;
import com.novafurniture.NovaFurniture.repository.CategoryRepository;
import com.novafurniture.NovaFurniture.repository.ProductRepository;
import com.novafurniture.NovaFurniture.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;

    @Override
    public PageResponse<ProductResponse> getAllProducts(
            String keyword, Long categoryId, Long brandId,
            String material, String color,
            BigDecimal minPrice, BigDecimal maxPrice,
            int page, int size, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = productRepository.findWithFilters(
                keyword, categoryId, brandId,
                material, color, minPrice, maxPrice,
                pageable
        );

        return PageResponse.<ProductResponse>builder()
                .content(productPage.getContent().stream()
                        .map(this::toProductResponse)
                        .toList())
                .pageNumber(productPage.getNumber())
                .pageSize(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return toProductResponse(product);
    }

    @Override
    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return toProductResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        String slug = CategoryServiceImpl.generateSlug(request.getName());

        if (productRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Brand brand = null;
        if (request.getBrandId() != null) {
            brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        }

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        Product product = Product.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .material(request.getMaterial())
                .dimensions(request.getDimensions())
                .color(request.getColor())
                .weight(request.getWeight())
                .thumbnail(request.getThumbnail())
                .brand(brand)
                .category(category)
                .build();

        productRepository.save(product);
        log.info("Product created: {}", product.getName());
        return toProductResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (request.getBrandId() != null) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
            product.setBrand(brand);
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            product.setCategory(category);
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setMaterial(request.getMaterial());
        product.setDimensions(request.getDimensions());
        product.setColor(request.getColor());
        product.setWeight(request.getWeight());
        product.setThumbnail(request.getThumbnail());

        productRepository.save(product);
        log.info("Product updated: {}", id);
        return toProductResponse(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productRepository.delete(product);
        log.info("Product deleted: {}", id);
    }

    private ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .material(product.getMaterial())
                .dimensions(product.getDimensions())
                .color(product.getColor())
                .weight(product.getWeight())
                .thumbnail(product.getThumbnail())
                .brand(product.getBrand() != null ? BrandResponse.builder()
                        .id(product.getBrand().getId())
                        .name(product.getBrand().getName())
                        .slug(product.getBrand().getSlug())
                        .logo(product.getBrand().getLogo())
                        .build() : null)
                .category(product.getCategory() != null ? CategoryResponse.builder()
                        .id(product.getCategory().getId())
                        .name(product.getCategory().getName())
                        .slug(product.getCategory().getSlug())
                        .build() : null)
                .createdAt(product.getCreatedAt())
                .build();
    }
}