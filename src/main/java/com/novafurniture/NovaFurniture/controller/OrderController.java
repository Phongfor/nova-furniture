package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.config.CustomUserDetails;
import com.novafurniture.NovaFurniture.dto.request.PlaceOrderRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateOrderStatusRequest;
import com.novafurniture.NovaFurniture.dto.response.OrderResponse;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Order", description = "Order management")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Place order from current cart")
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.placeOrder(userDetails.getId(), request)));
    }

    @GetMapping("/my")
    @Operation(summary = "Get my orders (paginated)")
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getMyOrders(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.getMyOrders(userDetails.getId(), page, size)));
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get order detail by ID")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long orderId) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.getOrderById(userDetails.getId(), orderId)));
    }

    @PatchMapping("/{orderId}/cancel")
    @Operation(summary = "Cancel order (only PENDING)")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long orderId) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.cancelOrder(userDetails.getId(), orderId)));
    }

    // ── Admin endpoints ──────────────────────────────────────────────────────
    @GetMapping
    @Operation(summary = "[ADMIN] Get all orders")
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.getAllOrders(page, size)));
    }

    @PatchMapping("/{orderId}/status")
    @Operation(summary = "[ADMIN] Update order status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(
            @PathVariable Long orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(orderService.updateOrderStatus(orderId, request)));
    }
}