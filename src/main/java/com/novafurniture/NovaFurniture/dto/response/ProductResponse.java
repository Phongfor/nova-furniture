package com.novafurniture.NovaFurniture.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String material;
    private String dimensions;
    private String color;
    private BigDecimal weight;
    private String thumbnail;
    private BrandResponse brand;
    private CategoryResponse category;
    private LocalDateTime createdAt;
}