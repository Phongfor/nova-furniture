package com.novafurniture.NovaFurniture.dto.response;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private List<CartItemResponse> items;
    private int totalItems;
    private BigDecimal totalPrice;
}