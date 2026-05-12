package com.novafurniture.NovaFurniture.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class BrandRequest {

    @NotBlank(message = "Brand name is required")
    private String name;

    private String description;
    private String logo;
}