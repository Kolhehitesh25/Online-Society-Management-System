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

public class ComplaintRespDto {

	
	private Long id;
	private String message;
	private String status;
	private String fullName;  
	private LocalDate sentDateTime;
	
	
	
	    
}
