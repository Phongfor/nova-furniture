package com.novafurniture.NovaFurniture.repository;

import com.novafurniture.NovaFurniture.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query(value = """
        SELECT oi.product_id,
               oi.product_name,
               oi.product_thumbnail,
               SUM(oi.quantity) as total_quantity,
               SUM(oi.subtotal) as total_revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE o.status = 'DELIVERED'
        GROUP BY oi.product_id, oi.product_name, oi.product_thumbnail
        ORDER BY total_quantity DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<Object[]> findTopSellingProducts(@Param("limit") int limit);
}