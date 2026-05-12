package com.novafurniture.NovaFurniture.repository;

import com.novafurniture.NovaFurniture.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    boolean existsBySlug(String slug);

    // Search + filter với pagination
    @Query(value = """
        SELECT * FROM products p
        WHERE (:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')))
        AND (:categoryId IS NULL OR p.category_id = :categoryId)
        AND (:brandId IS NULL OR p.brand_id = :brandId)
        AND (:material IS NULL OR p.material = :material)
        AND (:color IS NULL OR p.color = :color)
        AND (:minPrice IS NULL OR p.price >= CAST(:minPrice AS NUMERIC))
        AND (:maxPrice IS NULL OR p.price <= CAST(:maxPrice AS NUMERIC))
        ORDER BY p.created_at DESC
        """,
            countQuery = """
        SELECT COUNT(*) FROM products p
        WHERE (:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')))
        AND (:categoryId IS NULL OR p.category_id = :categoryId)
        AND (:brandId IS NULL OR p.brand_id = :brandId)
        AND (:material IS NULL OR p.material = :material)
        AND (:color IS NULL OR p.color = :color)
        AND (:minPrice IS NULL OR p.price >= CAST(:minPrice AS NUMERIC))
        AND (:maxPrice IS NULL OR p.price <= CAST(:maxPrice AS NUMERIC))
        """,
            nativeQuery = true)
    Page<Product> findWithFilters(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("brandId") Long brandId,
            @Param("material") String material,
            @Param("color") String color,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
}