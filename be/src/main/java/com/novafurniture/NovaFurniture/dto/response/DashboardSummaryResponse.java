package com.novafurniture.NovaFurniture.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class DashboardSummaryResponse {
    private long totalUsers;
    private long totalProducts;
    private long totalOrders;
    private long pendingOrders;
    private BigDecimal totalRevenue;      // tổng doanh thu từ DELIVERED orders
    private BigDecimal revenueThisMonth;  // doanh thu tháng này
}