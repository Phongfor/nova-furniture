package com.novafurniture.NovaFurniture.dto.request;

import com.novafurniture.NovaFurniture.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {

    @NotNull(message = "Status is required")
    private OrderStatus status;
}