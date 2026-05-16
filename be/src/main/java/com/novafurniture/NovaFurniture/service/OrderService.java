package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.PlaceOrderRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateOrderStatusRequest;
import com.novafurniture.NovaFurniture.dto.response.OrderResponse;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.enums.OrderStatus;

public interface OrderService {
    OrderResponse placeOrder(Long userId, PlaceOrderRequest request);
    OrderResponse getOrderById(Long userId, Long orderId);
    PageResponse<OrderResponse> getMyOrders(Long userId, int page, int size);
    OrderResponse cancelOrder(Long userId, Long orderId);

    // Admin
    PageResponse<OrderResponse> getAllOrders(int page, int size);
    OrderResponse updateOrderStatus(Long orderId, UpdateOrderStatusRequest request);
}