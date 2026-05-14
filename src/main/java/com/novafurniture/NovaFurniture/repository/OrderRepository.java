package com.novafurniture.NovaFurniture.repository;

import com.novafurniture.NovaFurniture.entity.Order;
import com.novafurniture.NovaFurniture.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserId(Long userId, Pageable pageable);

    Page<Order> findByStatus(OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);

    // Tổng revenue từ DELIVERED orders
    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o WHERE o.status = 'DELIVERED'")
    BigDecimal findTotalRevenue();

    // Revenue tháng này
    @Query("""
    SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o
    WHERE o.status = 'DELIVERED'
    AND YEAR(o.createdAt) = :year
    AND MONTH(o.createdAt) = :month
    """)
    BigDecimal findRevenueByMonth(@Param("year") int year, @Param("month") int month);

    // Count theo status
    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countByStatus();

    // Revenue theo tháng (12 tháng gần nhất)
    @Query(value = """
    SELECT TO_CHAR(created_at, 'YYYY-MM') as period,
           SUM(total_price) as revenue,
           COUNT(*) as order_count
    FROM orders
    WHERE status = 'DELIVERED'
    AND created_at >= NOW() - INTERVAL '12 months'
    GROUP BY TO_CHAR(created_at, 'YYYY-MM')
    ORDER BY period ASC
    """, nativeQuery = true)
    List<Object[]> findMonthlyRevenue();

    // Revenue theo ngày (30 ngày gần nhất)
    @Query(value = """
    SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as period,
           SUM(total_price) as revenue,
           COUNT(*) as order_count
    FROM orders
    WHERE status = 'DELIVERED'
    AND created_at >= NOW() - INTERVAL '30 days'
    GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
    ORDER BY period ASC
    """, nativeQuery = true)
    List<Object[]> findDailyRevenue();

    // Count pending orders
    long countByStatus(OrderStatus status);
}