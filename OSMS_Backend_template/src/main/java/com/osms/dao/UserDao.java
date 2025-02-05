package com.osms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osms.dtos.ResidentPaymentDto;
import com.osms.pojos.User;
import com.osms.pojos.UserRole;

public interface UserDao extends JpaRepository<User, Long> {

	List<User> findByRole(UserRole role);

	// ResidentPaymentDto getResidentPaymentDetails(Long residentId);

	@Query("SELECT new com.osms.dtos.ResidentPaymentDto(r.fullName, r.email, p.status, p.totalAmount) "
			+ "FROM Payment p JOIN p.resident r " + "WHERE r.id = :residentId")
	ResidentPaymentDto getResidentPaymentDetails(@Param("residentId") Long residentId);

	User findByIdAndRole(Long id, UserRole role);

	Optional<User> findByEmail(String email);

	Optional<User> findByEmailAndPasswordAndRole(String email, String password, UserRole role);

}
