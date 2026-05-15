package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.config.VNPayConfig;
import com.novafurniture.NovaFurniture.dto.response.CreatePaymentResponse;
import com.novafurniture.NovaFurniture.dto.response.PaymentResponse;
import com.novafurniture.NovaFurniture.entity.Order;
import com.novafurniture.NovaFurniture.entity.Payment;
import com.novafurniture.NovaFurniture.enums.OrderStatus;
import com.novafurniture.NovaFurniture.enums.PaymentStatus;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.repository.OrderRepository;
import com.novafurniture.NovaFurniture.repository.PaymentRepository;
import com.novafurniture.NovaFurniture.service.PaymentService;
import com.novafurniture.NovaFurniture.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository   orderRepository;
    private final VNPayConfig       vnPayConfig;

    @Override
    @Transactional
    public CreatePaymentResponse createPayment(Long userId, Long orderId,
                                               HttpServletRequest request) {
        // Kiểm tra order tồn tại và thuộc về user
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // Chỉ tạo payment cho PENDING order
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new AppException(ErrorCode.ORDER_NOT_PENDING);
        }

        // Kiểm tra đã có payment chưa
        if (paymentRepository.existsByOrderId(orderId)) {
            throw new AppException(ErrorCode.PAYMENT_ALREADY_EXISTS);
        }

        // Tạo mã giao dịch
        String vnpTxnRef = VNPayUtil.generateTxnRef();

        // Build VNPay params
        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version",    VNPayConfig.VERSION);
        vnpParams.put("vnp_Command",    VNPayConfig.COMMAND);
        vnpParams.put("vnp_TmnCode",    vnPayConfig.getTmnCode());
        vnpParams.put("vnp_Amount",     String.valueOf(
                order.getTotalPrice().multiply(BigDecimal.valueOf(100)).longValue()));
        vnpParams.put("vnp_CurrCode",   VNPayConfig.CURR_CODE);
        vnpParams.put("vnp_TxnRef",     vnpTxnRef);
        vnpParams.put("vnp_OrderInfo",  "Thanh toan don hang " + orderId);
        vnpParams.put("vnp_OrderType",  VNPayConfig.ORDER_TYPE);
        vnpParams.put("vnp_Locale",     VNPayConfig.LOCALE);
        vnpParams.put("vnp_ReturnUrl",  vnPayConfig.getReturnUrl());
        vnpParams.put("vnp_IpAddr",     getClientIp(request));
        vnpParams.put("vnp_CreateDate", VNPayUtil.formatDateTime(LocalDateTime.now()));
        vnpParams.put("vnp_ExpireDate", VNPayUtil.formatDateTime(
                LocalDateTime.now().plusMinutes(15)));

        // Tạo chữ ký
        String hashDataAndQuery = VNPayUtil.buildQueryString(vnpParams);
        String[] parts    = hashDataAndQuery.split("\\|");
        String hashData   = parts[0];
        String queryStr   = parts[1];
        String secureHash = VNPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

        String paymentUrl = vnPayConfig.getVnpayUrl() + "?" + queryStr
                + "&vnp_SecureHashType=HmacSHA512"
                + "&vnp_SecureHash=" + secureHash;

        // Lưu payment vào DB
        Payment payment = Payment.builder()
                .order(order)
                .vnpTxnRef(vnpTxnRef)
                .amount(order.getTotalPrice())
                .status(PaymentStatus.PENDING)
                .paymentUrl(paymentUrl)
                .build();
        paymentRepository.save(payment);

        log.info("Payment created for order {}: txnRef={}", orderId, vnpTxnRef);
        return new CreatePaymentResponse(paymentUrl, vnpTxnRef);
    }

    @Override
    @Transactional
    public PaymentResponse handleCallback(Map<String, String> params) {
        // Verify chữ ký
        String vnpSecureHash = params.get("vnp_SecureHash");
        Map<String, String> signParams = new HashMap<>(params);
        signParams.remove("vnp_SecureHash");
        signParams.remove("vnp_SecureHashType");

        String hashDataAndQuery = VNPayUtil.buildQueryString(signParams);
        String hashData   = hashDataAndQuery.split("\\|")[0];
        String checkHash  = VNPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

        if (!checkHash.equals(vnpSecureHash)) {
            throw new AppException(ErrorCode.PAYMENT_INVALID_SIGNATURE);
        }

        // Tìm payment theo txnRef
        String vnpTxnRef = params.get("vnp_TxnRef");
        Payment payment = paymentRepository.findByVnpTxnRef(vnpTxnRef)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));

        // Cập nhật trạng thái
        String responseCode = params.get("vnp_ResponseCode");
        if ("00".equals(responseCode)) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setVnpTransactionNo(params.get("vnp_TransactionNo"));
            payment.setVnpBankCode(params.get("vnp_BankCode"));
            payment.setPaidAt(LocalDateTime.now());

            // Cập nhật order status → CONFIRMED
            Order order = payment.getOrder();
            order.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);

            log.info("Payment SUCCESS for order {}", order.getId());
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            log.info("Payment FAILED for txnRef {}, responseCode={}",
                    vnpTxnRef, responseCode);
        }

        paymentRepository.save(payment);
        return toResponse(payment);
    }

    @Override
    public PaymentResponse getPaymentByOrderId(Long userId, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));

        return toResponse(payment);
    }

    // ── Helper ──────────────────────────────────────────────────────────────
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        // Convert IPv6 localhost sang IPv4
        if ("0:0:0:0:0:0:0:1".equals(ip) || "::1".equals(ip)) {
            ip = "127.0.0.1";
        }

        // Nếu có nhiều IP (X-Forwarded-For), lấy IP đầu tiên
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }

        return ip;
    }

    private PaymentResponse toResponse(Payment payment) {
        PaymentResponse resp = new PaymentResponse();
        resp.setId(payment.getId());
        resp.setOrderId(payment.getOrder().getId());
        resp.setVnpTxnRef(payment.getVnpTxnRef());
        resp.setVnpTransactionNo(payment.getVnpTransactionNo());
        resp.setVnpBankCode(payment.getVnpBankCode());
        resp.setAmount(payment.getAmount());
        resp.setStatus(payment.getStatus());
        resp.setPaymentUrl(payment.getPaymentUrl());
        resp.setPaidAt(payment.getPaidAt());
        resp.setCreatedAt(payment.getCreatedAt());
        return resp;
    }
}