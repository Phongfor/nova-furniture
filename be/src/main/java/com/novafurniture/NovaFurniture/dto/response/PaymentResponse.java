package com.novafurniture.NovaFurniture.dto.response;

import com.novafurniture.NovaFurniture.enums.PaymentStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentResponse {
    private Long id;
    private Long orderId;
    private String vnpTxnRef;
    private String vnpTransactionNo;
    private String vnpBankCode;
    private BigDecimal amount;
    private PaymentStatus status;
    private String paymentUrl;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}