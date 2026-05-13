package com.novafurniture.NovaFurniture.dto.response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class WishlistItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productSlug;
    private String productThumbnail;
    private BigDecimal productPrice;
    private LocalDateTime createdAt;
}