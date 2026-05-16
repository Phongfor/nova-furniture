package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.response.*;

import java.util.List;

public interface AdminDashboardService {
    DashboardSummaryResponse getSummary();
    List<RevenueByPeriodResponse> getMonthlyRevenue();
    List<RevenueByPeriodResponse> getDailyRevenue();
    List<OrderStatsResponse> getOrderStats();
    List<TopSellingProductResponse> getTopSellingProducts(int limit);
    List<UserResponse> getRecentUsers(int limit);
}