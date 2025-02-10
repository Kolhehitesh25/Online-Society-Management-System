package com.osms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.osms.pojos.Payment;
import com.osms.pojos.User;

public interface PaymentDao extends JpaRepository<Payment, Long> {

    // Method to find a payment by resident (User )
    Optional<Payment> findByResident(User resident);  

    // Method to find a payment by resident ID
    @Query("SELECT p FROM Payment p WHERE p.resident.id = :residentId")
    Optional<Payment> findByResidentId(@Param("residentId") Long residentId);

    // Update payment status to PAID
    @Modifying
    @Transactional
    @Query("UPDATE Payment p SET p.status = 'PAID' WHERE p.resident.id = :residentId")
    int updatePaymentStatus(@Param("residentId") Long residentId);
}