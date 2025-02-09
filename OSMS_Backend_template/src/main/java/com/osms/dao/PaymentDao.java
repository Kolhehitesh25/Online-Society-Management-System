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

	 Optional<Payment> findByResident(User resident);  
	 
	 @Query("SELECT p FROM Payment p WHERE p.resident.id = :residentId")
	    Payment findByResidentId(@Param("residentId") Long residentId);

	    @Modifying
	    @Transactional
	    @Query("UPDATE Payment p SET p.status = 'PAID' WHERE p.resident.id = :residentId")
	    int updatePaymentStatus(@Param("residentId") Long residentId);
}
