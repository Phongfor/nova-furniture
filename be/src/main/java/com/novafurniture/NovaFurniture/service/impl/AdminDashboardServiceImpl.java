package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.response.*;
import com.novafurniture.NovaFurniture.enums.OrderStatus;
import com.novafurniture.NovaFurniture.repository.*;
import com.novafurniture.NovaFurniture.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository      userRepository;
    private final ProductRepository   productRepository;
    private final OrderRepository     orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public DashboardSummaryResponse getSummary() {
        long totalUsers    = userRepository.count();
        long totalProducts = productRepository.count();
        long totalOrders   = orderRepository.count();
        long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);

        BigDecimal totalRevenue = orderRepository.findTotalRevenue();

        LocalDateTime now = LocalDateTime.now();
        BigDecimal revenueThisMonth = orderRepository
                .findRevenueByMonth(now.getYear(), now.getMonthValue());

        return DashboardSummaryResponse.builder()
                .totalUsers(totalUsers)
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .totalRevenue(totalRevenue)
                .revenueThisMonth(revenueThisMonth)
                .build();
    }

    @Override
    public List<RevenueByPeriodResponse> getMonthlyRevenue() {
        return orderRepository.findMonthlyRevenue().stream()
                .map(row -> new RevenueByPeriodResponse(
                        (String) row[0],
                        new BigDecimal(row[1].toString()),
                        ((Number) row[2]).longValue()
                ))
                .toList();
    }

    @Override
    public List<RevenueByPeriodResponse> getDailyRevenue() {
        return orderRepository.findDailyRevenue().stream()
                .map(row -> new RevenueByPeriodResponse(
                        (String) row[0],
                        new BigDecimal(row[1].toString()),
                        ((Number) row[2]).longValue()
                ))
                .toList();
    }

    @Override
    public List<OrderStatsResponse> getOrderStats() {
        return Arrays.stream(OrderStatus.values())
                .map(status -> new OrderStatsResponse(
                        status.name(),
                        orderRepository.countByStatus(status)
                ))
                .toList();
    }

    @Override
    public List<TopSellingProductResponse> getTopSellingProducts(int limit) {
        return orderItemRepository.findTopSellingProducts(limit).stream()
                .map(row -> new TopSellingProductResponse(
                        ((Number) row[0]).longValue(),
                        (String) row[1],
                        (String) row[2],
                        ((Number) row[3]).longValue(),
                        new BigDecimal(row[4].toString())
                ))
                .toList();
    }

    @Override
    public List<UserResponse> getRecentUsers(int limit) {
        return userRepository
                .findAll(PageRequest.of(0, limit,
                        Sort.by("createdAt").descending()))
                .getContent()
                .stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .fullname(user.getFullname())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .role(user.getRole())
                        .createdAt(user.getCreatedAt())
                        .build())
                .toList();
    }
}