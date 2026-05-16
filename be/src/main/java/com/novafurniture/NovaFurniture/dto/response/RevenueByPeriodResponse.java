package com.novafurniture.NovaFurniture.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RevenueByPeriodResponse {
    private String period;       // "2026-01", "2026-01-14"
    private BigDecimal revenue;
    private long orderCount;
}