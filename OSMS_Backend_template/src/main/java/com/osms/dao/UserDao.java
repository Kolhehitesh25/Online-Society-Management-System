package com.osms.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osms.dtos.ResidentDTO;
import com.osms.dtos.ResidentPaymentDto;
import com.osms.dtos.StaffDTO;
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

	// Find a user by password reset token (to validate token during reset)
	Optional<User> findByPasswordResetToken(String token);

	@Query("SELECT new com.osms.dtos.ResidentDTO(u.id, u.fullName, f.flatNumber, u.mobileNo, u.email,u.status) "
			+ "FROM User u JOIN u.flat f WHERE u.status = true or u.status=false")
	List<ResidentDTO> getAllResidents();

//    @Query("SELECT u FROM User u WHERE u.role = 'RESIDENT' ORDER BY u.status DESC") 
//    List<User> findAllResidents(); 

	@Query("SELECT new com.osms.dtos.StaffDTO(u.id, u.fullName, u.mobileNo, u.email, u.status,u.role) "
			+ "FROM User u WHERE u.role IN ('CLEANER', 'SECURITY')")
	List<StaffDTO> getAllStaff();

	boolean existsByEmail(String email);

	long countByRole(UserRole role);
}
