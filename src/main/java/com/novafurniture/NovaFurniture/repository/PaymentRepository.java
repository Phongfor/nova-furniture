package com.novafurniture.NovaFurniture.repository;

import com.novafurniture.NovaFurniture.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(Long orderId);
    Optional<Payment> findByVnpTxnRef(String vnpTxnRef);
    boolean existsByOrderId(Long orderId);
}