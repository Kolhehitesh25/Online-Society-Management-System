package com.osms.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResidentFacilityBookingDto {
	private Long id;
	private String facilityName;
    private LocalDate fromDateTime;
    private LocalDate toDateTime;
    private String status;


}
