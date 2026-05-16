package com.novafurniture.NovaFurniture.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Stock is required")
    @PositiveOrZero(message = "Stock must be greater than or equal to 0")
    private Integer stock;

    private String material;
    private String dimensions;
    private String color;
    private BigDecimal weight;
    private String thumbnail;
    private Long brandId;
    private Long categoryId;
}