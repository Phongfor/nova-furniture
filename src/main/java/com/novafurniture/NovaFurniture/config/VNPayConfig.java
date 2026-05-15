package com.novafurniture.NovaFurniture.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class VNPayConfig {

    @Value("${vnpay.tmn-code}")
    private String tmnCode;

    @Value("${vnpay.hash-secret}")
    private String hashSecret;

    @Value("${vnpay.url}")
    private String vnpayUrl;

    @Value("${vnpay.return-url}")
    private String returnUrl;

    @Value("${vnpay.api-url}")
    private String apiUrl;

    public static final String VERSION    = "2.1.0";
    public static final String COMMAND    = "pay";
    public static final String CURR_CODE  = "VND";
    public static final String LOCALE     = "vn";
    public static final String ORDER_TYPE = "other";
}