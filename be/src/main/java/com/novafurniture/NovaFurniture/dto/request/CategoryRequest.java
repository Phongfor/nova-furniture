package com.novafurniture.NovaFurniture.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CategoryRequest {

    @NotBlank(message = "Category name is required")
    private String name;

    private String description;
    private Long parentId;
}