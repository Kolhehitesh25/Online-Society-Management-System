package com.osms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentFacilityBookingDto;
import com.osms.pojos.FacilityBooking;

public interface FacilityBookingDao  extends JpaRepository<FacilityBooking, Long>{

	
	@Query("SELECT new com.osms.dtos.FacilityBookingRespDto(f.id,f.facilityName, f.fromDateTime, f.toDateTime, f.status, r.fullName, r.email) " +
		       "FROM FacilityBooking f JOIN f.resident r")
		List<FacilityBookingRespDto> findAllBookedFacilities();

	@Query("SELECT new com.osms.dtos.ResidentFacilityBookingDto(c.id, c.facilityName, c.fromDateTime,c.toDateTime , c.status) " +
		       "FROM FacilityBooking c  WHERE c.resident.id = :residentId")
	List<ResidentFacilityBookingDto> findByResidentId(Long residentId);
}

