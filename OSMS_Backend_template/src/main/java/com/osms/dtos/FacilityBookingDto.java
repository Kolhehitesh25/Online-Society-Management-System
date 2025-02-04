package com.osms.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityBookingDto {

	 private String facilityName;

	    
	    private LocalDate fromDateTime;

	 
	    private LocalDate toDateTime;

	    private Long residentId;
}