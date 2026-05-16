package com.novafurniture.NovaFurniture.dto.response;

import com.novafurniture.NovaFurniture.enums.OrderStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private Long userId;
    private String recipientName;
    private String recipientPhone;
    private String shippingAddress;
    private String note;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}