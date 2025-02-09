package com.osms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osms.dtos.ComplaintRespDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.pojos.Complaint;

public interface ComplaintDao extends JpaRepository<Complaint, Long>{

	@Query("SELECT new com.osms.dtos.ComplaintRespDto(c.id,c.description,c.status, r.fullName, c.sentDateTime) " +
		       "FROM Complaint c JOIN c.resident r")
		List<ComplaintRespDto> findAllComplaints();

	@Query("SELECT new com.osms.dtos.ComplaintRespDto(c.id, c.description, c.status, r.fullName, c.sentDateTime) " +
		       "FROM Complaint c JOIN c.resident r WHERE r.id = :residentId")
		List<ComplaintRespDto> findByResidentId(@Param("residentId") Long residentId);


}
