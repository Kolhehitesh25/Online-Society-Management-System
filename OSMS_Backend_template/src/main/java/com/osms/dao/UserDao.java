package com.osms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osms.dtos.ResidentPaymentDto;
import com.osms.pojos.User;

public interface UserDao extends JpaRepository<User,Long> {

	List<User> findByRole(String string);

	//ResidentPaymentDto getResidentPaymentDetails(Long residentId);
	
	@Query("SELECT new com.osms.dtos.ResidentPaymentDto(r.fullName, r.email, p.status, p.totalAmount) " +
		       "FROM Payment p JOIN p.resident r " +
		       "WHERE r.id = :residentId")
		ResidentPaymentDto getResidentPaymentDetails(@Param("residentId") Long residentId);

	User findByIdAndRole(Long id, String role);

	Optional<User> findByEmailAndPasswordAndRole(String email, String password, String string);

	Optional<User> findByEmail(String email);;


}
