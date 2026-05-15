package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.response.CreatePaymentResponse;
import com.novafurniture.NovaFurniture.dto.response.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface PaymentService {
    CreatePaymentResponse createPayment(Long userId, Long orderId,
                                        HttpServletRequest request);
    PaymentResponse handleCallback(Map<String, String> params);
    PaymentResponse getPaymentByOrderId(Long userId, Long orderId);
}