package com.novafurniture.NovaFurniture.mapper;

import com.novafurniture.NovaFurniture.dto.response.OrderItemResponse;
import com.novafurniture.NovaFurniture.dto.response.OrderResponse;
import com.novafurniture.NovaFurniture.entity.Order;
import com.novafurniture.NovaFurniture.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "user.id", target = "userId")
    OrderResponse toResponse(Order order);

    OrderItemResponse toItemResponse(OrderItem orderItem);
}