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
public class TaskResponseDto {

	 private Long id;
	    private String description;
	    private LocalDate assignedDate;
	    private String status;  
	    private String staff;  
}
