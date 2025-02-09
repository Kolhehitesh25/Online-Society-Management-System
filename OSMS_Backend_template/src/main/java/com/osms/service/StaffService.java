package com.osms.service;

import java.util.List;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.StaffRegistrationReqDto;
import com.osms.dtos.TaskResponseDto;

public interface StaffService {

	ApiResponse registerStaff(StaffRegistrationReqDto staffRegistrationDTO);

	List<TaskResponseDto> getTasksForCleaners();

	List<TaskResponseDto> getTasksForSecurity();

	ApiResponse updateTasksStatus(Long tasksId);

	List<TaskResponseDto> getAllTasks();

	
}