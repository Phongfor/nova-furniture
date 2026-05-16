package com.novafurniture.NovaFurniture.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class TopSellingProductResponse {
    private Long productId;
    private String productName;
    private String productThumbnail;
    private long totalQuantitySold;
    private BigDecimal totalRevenue;
}