package com.novafurniture.NovaFurniture.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrandResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String logo;
    private LocalDateTime createdAt;
}