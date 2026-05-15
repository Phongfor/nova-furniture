package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.config.CustomUserDetails;
import com.novafurniture.NovaFurniture.dto.response.CreatePaymentResponse;
import com.novafurniture.NovaFurniture.dto.response.PaymentResponse;
import com.novafurniture.NovaFurniture.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "VNPay payment integration")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/vnpay/create/{orderId}")
    @Operation(summary = "Create VNPay payment URL for order")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<CreatePaymentResponse>> createPayment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long orderId,
            HttpServletRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(paymentService.createPayment(
                        userDetails.getId(), orderId, request)));
    }

    @GetMapping("/vnpay/callback")
    @Operation(summary = "VNPay callback after payment (called by VNPay)")
    public ResponseEntity<ApiResponse<PaymentResponse>> handleCallback(
            @RequestParam Map<String, String> params) {
        return ResponseEntity.ok(
                ApiResponse.success(paymentService.handleCallback(params)));
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get payment status by order ID")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPayment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long orderId) {
        return ResponseEntity.ok(
                ApiResponse.success(paymentService.getPaymentByOrderId(
                        userDetails.getId(), orderId)));
    }
}