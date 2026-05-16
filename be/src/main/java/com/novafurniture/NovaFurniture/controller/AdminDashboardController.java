package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.dto.response.*;
import com.novafurniture.NovaFurniture.service.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin Dashboard", description = "Admin dashboard statistics")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    @GetMapping("/summary")
    @Operation(summary = "Get dashboard summary")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getSummary() {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getSummary()));
    }

    @GetMapping("/revenue/monthly")
    @Operation(summary = "Get revenue by month (last 12 months)")
    public ResponseEntity<ApiResponse<List<RevenueByPeriodResponse>>> getMonthlyRevenue() {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getMonthlyRevenue()));
    }

    @GetMapping("/revenue/daily")
    @Operation(summary = "Get revenue by day (last 30 days)")
    public ResponseEntity<ApiResponse<List<RevenueByPeriodResponse>>> getDailyRevenue() {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getDailyRevenue()));
    }

    @GetMapping("/orders/stats")
    @Operation(summary = "Get order count by status")
    public ResponseEntity<ApiResponse<List<OrderStatsResponse>>> getOrderStats() {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getOrderStats()));
    }

    @GetMapping("/products/top-selling")
    @Operation(summary = "Get top selling products")
    public ResponseEntity<ApiResponse<List<TopSellingProductResponse>>> getTopSelling(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getTopSellingProducts(limit)));
    }

    @GetMapping("/users/recent")
    @Operation(summary = "Get recently registered users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getRecentUsers(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(
                ApiResponse.success(dashboardService.getRecentUsers(limit)));
    }
}