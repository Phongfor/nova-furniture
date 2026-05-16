package com.novafurniture.NovaFurniture.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class OAuth2TokenRequest {

    @NotBlank(message = "Code is required")
    private String code;
}