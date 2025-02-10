package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetTasksbyIdResponseDto {
	private Long id;
	 private String description;
	 private String status;
}
